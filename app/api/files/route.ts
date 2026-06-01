import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { blobs } = await list()

    return NextResponse.json({
      files: blobs.map((blob) => ({
        url: blob.url,
        pathname: blob.pathname,
        filename: blob.pathname.split('/').pop() || 'unknown',
        folder: blob.pathname.split('/').slice(0, -1).join('/') || 'root',
        uploadedAt: blob.uploadedAt,
        size: blob.size,
      })),
    })
  } catch (error) {
    console.error('Error listing files:', error)
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 })
  }
}
