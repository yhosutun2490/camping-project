// app/api/member/orders/qrcode/route.ts
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  if (!url) {
    return new Response(JSON.stringify({ error: 'Missing image URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const imageRes = await fetch(url)

    if (!imageRes.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch image' }), {
        status: imageRes.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const contentType = imageRes.headers.get('Content-Type') || 'image/png'
    const buffer = await imageRes.arrayBuffer()

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
      },
    })
  } catch (err) {
    console.error('[Image Proxy Error]', err)
    return new Response(JSON.stringify({ error: 'Proxy failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}