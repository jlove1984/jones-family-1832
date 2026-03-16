/**
 * GET /api/gallery/albums - List albums (auth required).
 * POST /api/gallery/albums - Create album (admin only).
 */

import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/get-session'
import { sql } from '@/lib/db'
import { galleryAlbumPostBodySchema } from '@/lib/validations'
import type { GalleryAlbum } from '@/types'

function rowToAlbum(row: Record<string, unknown>): GalleryAlbum {
  return {
    id: row.id as string,
    title: row.title as string,
    description: row.description as string | null,
    year: row.year as number | null,
    category: row.category as string | null,
    coverPhotoUrl: row.cover_photo_url as string | null,
    createdBy: row.created_by as string | null,
    createdAt: new Date(row.created_at as string),
    updatedAt: new Date(row.updated_at as string),
  }
}

export async function GET(request: Request) {
  const session = await getSession(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { rows } = await sql`
      SELECT * FROM gallery_albums
      ORDER BY COALESCE(year, 0) DESC, created_at DESC
    `
    const list = (rows as Record<string, unknown>[]).map(rowToAlbum)
    return NextResponse.json(list)
  } catch (e) {
    console.error('GET /api/gallery/albums', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getSession(request)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const parsed = galleryAlbumPostBodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 })
  }

  const { title, description, year, category } = parsed.data
  try {
    const { rows } = await sql`
      INSERT INTO gallery_albums (title, description, year, category, created_by)
      VALUES (${title}, ${description ?? null}, ${year ?? null}, ${category ?? null}, ${session.user.id})
      RETURNING *
    `
    const row = (rows as Record<string, unknown>[])[0]
    return NextResponse.json(rowToAlbum(row), { status: 201 })
  } catch (e) {
    console.error('POST /api/gallery/albums', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
