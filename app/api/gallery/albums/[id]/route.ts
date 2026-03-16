/**
 * GET /api/gallery/albums/[id] - Get album with media.
 * PATCH /api/gallery/albums/[id] - Update album (admin).
 */

import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/get-session'
import { sql } from '@/lib/db'
import { galleryAlbumPatchBodySchema } from '@/lib/validations'
import type { GalleryAlbum, GalleryMedia } from '@/types'

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

function rowToMedia(row: Record<string, unknown>): GalleryMedia {
  return {
    id: row.id as string,
    albumId: row.album_id as string,
    mediaUrl: row.media_url as string,
    mediaType: row.media_type as string,
    caption: row.caption as string | null,
    uploadedBy: row.uploaded_by as string | null,
    fileSize: row.file_size as number | null,
    width: row.width as number | null,
    height: row.height as number | null,
    createdAt: new Date(row.created_at as string),
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  try {
    const { rows: albumRows } = await sql`SELECT * FROM gallery_albums WHERE id = ${id}`
    const albumRow = (albumRows as Record<string, unknown>[])[0]
    if (!albumRow) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    const { rows: mediaRows } = await sql`SELECT * FROM gallery_media WHERE album_id = ${id} ORDER BY created_at ASC`
    const album = rowToAlbum(albumRow)
    const media = (mediaRows as Record<string, unknown>[]).map(rowToMedia)
    return NextResponse.json({ ...album, media })
  } catch (e) {
    console.error('GET /api/gallery/albums/[id]', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession(request)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const parsed = galleryAlbumPatchBodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 })
  }

  const u = parsed.data
  try {
    await sql`
      UPDATE gallery_albums SET
        title = COALESCE(${u.title ?? null}, title),
        description = COALESCE(${u.description ?? null}, description),
        year = COALESCE(${u.year ?? null}, year),
        category = COALESCE(${u.category ?? null}, category),
        cover_photo_url = COALESCE(${u.coverPhotoUrl ?? null}, cover_photo_url),
        updated_at = NOW()
      WHERE id = ${id}
    `
    const { rows } = await sql`SELECT * FROM gallery_albums WHERE id = ${id}`
    const row = (rows as Record<string, unknown>[])[0]
    if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(rowToAlbum(row))
  } catch (e) {
    console.error('PATCH /api/gallery/albums/[id]', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
