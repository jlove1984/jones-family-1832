/**
 * DELETE /api/gallery/media/[id] - Delete media (admin only).
 */

import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/get-session'
import { sql } from '@/lib/db'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession(request)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params
  try {
    await sql`DELETE FROM gallery_media WHERE id = ${id}`
    return new NextResponse(null, { status: 204 })
  } catch (e) {
    console.error('DELETE /api/gallery/media/[id]', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
