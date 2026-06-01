import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

// Mapping slug projet -> nom du dossier dans le blob storage
const projectFolders: Record<string, string> = {
  'site-dynamique-m2l': 'm2l-dynamique',
  'stage-ferme-laroche': 'ferme-laroche',
  'site-statique-reservation-m2l': 'm2l-statique',
  'gsb-gestion-frais': 'gsb',
  'aux-claviers-citoyens': 'claviers-citoyens',
  'vivonsexpo-exposition': 'vivonsexpo',
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const folder = projectFolders[slug] || slug

    // Prend la 1re image du dossier gallery/<projet>/ peu importe le nom
    const { blobs } = await list({ prefix: `gallery/${folder}/` })
    const images = blobs.filter((b) =>
      /\.(png|jpe?g|webp|gif|avif)$/i.test(b.pathname)
    )

    if (images.length === 0) {
      return NextResponse.json({ url: null })
    }

    // Trie : numéros d'abord (screenshot-1, 2...), sinon le plus récent
    images.sort((a, b) => {
      const na = parseInt(a.pathname.match(/(\d+)/)?.[1] || '999999')
      const nb = parseInt(b.pathname.match(/(\d+)/)?.[1] || '999999')
      if (na !== nb) return na - nb
      return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    })

    return NextResponse.json({ url: images[0].url })
  } catch (error) {
    console.error('Error fetching project image:', error)
    return NextResponse.json({ url: null })
  }
}
