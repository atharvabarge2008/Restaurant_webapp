import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

let cachedClient = null
async function getDb() {
  if (cachedClient) return cachedClient.db(process.env.DB_NAME)
  const client = new MongoClient(process.env.MONGO_URL)
  await client.connect()
  cachedClient = client
  return client.db(process.env.DB_NAME)
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() { return NextResponse.json({}, { headers: corsHeaders }) }

const PROMOS = {
  'SHINDE10':    { code: 'SHINDE10',    type: 'percent', value: 10, label: '10% off your order', minSubtotal: 200 },
  'WELCOME50':   { code: 'WELCOME50',   type: 'flat',    value: 50, label: '\u20b950 off (first order)', minSubtotal: 300 },
  'FREEDEL':     { code: 'FREEDEL',     type: 'freedel', value: 0,  label: 'Free delivery', minSubtotal: 200 },
  'DINOSAUR':    { code: 'DINOSAUR',    type: 'percent', value: 15, label: '15% off (Dinosaur Rice special!)', minSubtotal: 250 },
  'SATARA100':   { code: 'SATARA100',   type: 'flat',    value: 100, label: '\u20b9100 off for Satara locals', minSubtotal: 600 }
}

const ORDER_STAGES = [
  { key: 'placed',      label: 'Order Placed',       desc: 'We have received your order.' },
  { key: 'confirmed',   label: 'Order Confirmed',    desc: 'Payment confirmed, kitchen notified.' },
  { key: 'preparing',   label: 'Wok on Fire',        desc: 'Our chef is preparing your food.' },
  { key: 'ready',       label: 'Ready to Serve',     desc: 'Food is packed and ready.' },
  { key: 'out',         label: 'Out for Delivery',   desc: 'Rider is on the way to you.' },
  { key: 'delivered',   label: 'Delivered',          desc: 'Enjoy your meal! \ud83c\udf1f' }
]

function stageIndexFromAge(createdAt, isDelivery) {
  const secs = (Date.now() - new Date(createdAt).getTime()) / 1000
  const flow = isDelivery
    ? [{s:'placed',t:0},{s:'confirmed',t:15},{s:'preparing',t:45},{s:'ready',t:180},{s:'out',t:300},{s:'delivered',t:900}]
    : [{s:'placed',t:0},{s:'confirmed',t:15},{s:'preparing',t:45},{s:'ready',t:240},{s:'delivered',t:600}]
  let currentIdx = 0
  flow.forEach((f, i) => { if (secs >= f.t) currentIdx = i })
  return { stageKey: flow[currentIdx].s, etaSeconds: flow[Math.min(currentIdx+1, flow.length-1)].t - secs, flow: flow.map(f => f.s) }
}

async function handle(request, { params }) {
  const rawPath = (params?.path || []).join('/')
  const parts = rawPath.split('/').filter(Boolean)
  const method = request.method

  try {
    if (!rawPath) return NextResponse.json({ ok: true, service: 'Shindesh API', time: new Date().toISOString() }, { headers: corsHeaders })

    // ------ RESERVATIONS ------
    if (parts[0] === 'reservations') {
      const db = await getDb()
      if (method === 'POST' && parts.length === 1) {
        const body = await request.json()
        if (!body?.name || !body?.phone || !body?.date || !body?.time) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400, headers: corsHeaders })
        }
        const doc = { id: uuidv4(), ...body, createdAt: new Date().toISOString(), status: 'pending' }
        await db.collection('reservations').insertOne(doc)
        const { _id, ...clean } = doc
        return NextResponse.json({ ok: true, reservation: clean }, { headers: corsHeaders })
      }
      if (method === 'GET' && parts.length === 2) {
        const item = await db.collection('reservations').findOne({ id: parts[1] }, { projection: { _id: 0 } })
        if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders })
        return NextResponse.json({ reservation: item }, { headers: corsHeaders })
      }
      if (method === 'GET' && parts.length === 1) {
        const items = await db.collection('reservations').find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(100).toArray()
        return NextResponse.json({ reservations: items }, { headers: corsHeaders })
      }
    }

    // ------ CONTACT ------
    if (parts[0] === 'contact' && method === 'POST') {
      const body = await request.json()
      if (!body?.name || !body?.email || !body?.message) return NextResponse.json({ error: 'Missing fields' }, { status: 400, headers: corsHeaders })
      const db = await getDb()
      const doc = { id: uuidv4(), ...body, createdAt: new Date().toISOString() }
      await db.collection('contact_messages').insertOne(doc)
      const { _id, ...clean } = doc
      return NextResponse.json({ ok: true, message: clean }, { headers: corsHeaders })
    }

    // ------ PROMO ------
    if (parts[0] === 'promo' && method === 'POST') {
      const body = await request.json()
      const code = String(body?.code || '').toUpperCase().trim()
      const subtotal = Number(body?.subtotal || 0)
      const p = PROMOS[code]
      if (!p) return NextResponse.json({ error: 'Invalid promo code' }, { status: 400, headers: corsHeaders })
      if (subtotal < (p.minSubtotal || 0)) return NextResponse.json({ error: `Add \u20b9${(p.minSubtotal||0)-subtotal} more to unlock this offer` }, { status: 400, headers: corsHeaders })
      return NextResponse.json({ ok: true, promo: p }, { headers: corsHeaders })
    }

    // ------ ORDERS ------
    if (parts[0] === 'orders') {
      const db = await getDb()
      if (method === 'POST' && parts.length === 1) {
        const body = await request.json()
        if (!Array.isArray(body?.items) || body.items.length === 0) return NextResponse.json({ error: 'Cart is empty' }, { status: 400, headers: corsHeaders })
        if (!body?.customer?.name || !body?.customer?.phone) return NextResponse.json({ error: 'Name and phone required' }, { status: 400, headers: corsHeaders })
        if (body.mode === 'delivery' && !body?.customer?.address) return NextResponse.json({ error: 'Delivery address required' }, { status: 400, headers: corsHeaders })
        const shortId = 'SS' + String(Math.floor(100000 + Math.random() * 900000))
        const doc = {
          id: uuidv4(),
          shortId,
          ...body,
          status: 'placed',
          createdAt: new Date().toISOString(),
          etaMinutes: body.mode === 'delivery' ? 35 : 20
        }
        await db.collection('orders').insertOne(doc)
        const { _id, ...clean } = doc
        return NextResponse.json({ ok: true, order: clean }, { headers: corsHeaders })
      }
      if (method === 'GET' && parts.length === 2) {
        const q = parts[1]
        const item = await db.collection('orders').findOne({ $or: [{ id: q }, { shortId: q.toUpperCase() }] }, { projection: { _id: 0 } })
        if (!item) return NextResponse.json({ error: 'Order not found' }, { status: 404, headers: corsHeaders })
        // compute stage based on age
        const stageInfo = stageIndexFromAge(item.createdAt, item.mode === 'delivery')
        return NextResponse.json({ order: { ...item, currentStage: stageInfo.stageKey, flow: stageInfo.flow, stages: ORDER_STAGES } }, { headers: corsHeaders })
      }
    }

    return NextResponse.json({ error: 'Not found', path: rawPath }, { status: 404, headers: corsHeaders })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500, headers: corsHeaders })
  }
}

export const GET = handle
export const POST = handle
export const PUT = handle
export const DELETE = handle
