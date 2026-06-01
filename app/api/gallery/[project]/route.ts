import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ project: string }> }
) {
  try {
    const { project } = await params
    const prefix = `gallery/${project}/`

    const { blobs } = await list({ prefix })

    // Accepte tous les formats image, peu importe le nom
    const sortedBlobs = blobs
      .filter((b) => /\.(png|jpe?g|webp|gif|avif)$/i.test(b.pathname))
      .sort((a, b) => {
        const na = parseInt(a.pathname.match(/(\d+)/)?.[1] || '999999')
        const nb = parseInt(b.pathname.match(/(\d+)/)?.[1] || '999999')
        if (na !== nb) return na - nb
        return a.pathname.localeCompare(b.pathname)
      })

    return NextResponse.json({
      images: sortedBlobs.map((blob) => ({
        url: blob.url,
        pathname: blob.pathname,
        filename: blob.pathname.split('/').pop() || 'unknown',
        uploadedAt: blob.uploadedAt,
        size: blob.size,
      })),
    })
  } catch (error) {
    console.error('Error listing gallery:', error)
    return NextResponse.json({ images: [] })
  }
}
