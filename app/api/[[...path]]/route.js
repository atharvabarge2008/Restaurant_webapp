import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

let cachedClient = null
async function getDb() {
  if (cachedClient) return cachedClient.db()
  const client = new MongoClient(process.env.MONGO_URL)
  await client.connect()
  cachedClient = client
  return client.db()
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

async function handle(request, { params }) {
  const rawPath = (params?.path || []).join('/')
  const method = request.method

  try {
    // Root
    if (!rawPath || rawPath === '') {
      return NextResponse.json({ ok: true, service: 'Golden Dragon API', time: new Date().toISOString() }, { headers: corsHeaders })
    }

    // Reservations
    if (rawPath === 'reservations' && method === 'POST') {
      const body = await request.json()
      if (!body?.name || !body?.email || !body?.date) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400, headers: corsHeaders })
      }
      const db = await getDb()
      const doc = { id: uuidv4(), ...body, createdAt: new Date().toISOString(), status: 'pending' }
      await db.collection('reservations').insertOne(doc)
      return NextResponse.json({ ok: true, reservation: doc }, { headers: corsHeaders })
    }

    if (rawPath === 'reservations' && method === 'GET') {
      const db = await getDb()
      const items = await db.collection('reservations').find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(100).toArray()
      return NextResponse.json({ reservations: items }, { headers: corsHeaders })
    }

    // Contact
    if (rawPath === 'contact' && method === 'POST') {
      const body = await request.json()
      if (!body?.name || !body?.email || !body?.message) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400, headers: corsHeaders })
      }
      const db = await getDb()
      const doc = { id: uuidv4(), ...body, createdAt: new Date().toISOString() }
      await db.collection('contact_messages').insertOne(doc)
      return NextResponse.json({ ok: true, message: doc }, { headers: corsHeaders })
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
