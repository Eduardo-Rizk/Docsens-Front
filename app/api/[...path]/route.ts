import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001'

async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  // Strip the /api prefix to get the backend path
  const backendPath = pathname.replace(/^\/api/, '')
  const url = `${BACKEND_URL}${backendPath}${search}`

  const headers = new Headers(request.headers)
  // Remove Next.js-specific headers
  headers.delete('host')

  const init: RequestInit = {
    method: request.method,
    headers,
  }

  // Forward body for non-GET/HEAD requests
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = await request.text()
  }

  try {
    const backendRes = await fetch(url, init)
    const body = await backendRes.text()

    return new NextResponse(body, {
      status: backendRes.status,
      headers: {
        'Content-Type': backendRes.headers.get('Content-Type') || 'application/json',
      },
    })
  } catch {
    return NextResponse.json(
      { message: 'Backend unavailable' },
      { status: 502 },
    )
  }
}

export const GET = proxy
export const POST = proxy
export const PUT = proxy
export const PATCH = proxy
export const DELETE = proxy
