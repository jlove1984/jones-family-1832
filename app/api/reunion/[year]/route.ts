/**
 * GET /api/reunion/[year] - Get reunion content (event details) for a year.
 */

import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import type { ReunionContent } from '@/types'

function rowToContent(row: Record<string, unknown>): ReunionContent {
  return {
    id: row.id as string,
    reunionYear: row.reunion_year as number,
    contentKey: row.content_key as string,
    contentValue: row.content_value as string | null,
    contentType: row.content_type as string,
    sortOrder: row.sort_order as number,
    updatedBy: row.updated_by as string | null,
    updatedAt: new Date(row.updated_at as string),
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ year: string }> }
) {
  const { year } = await params
  const y = parseInt(year, 10)
  if (Number.isNaN(y) || y < 2020 || y > 2030) {
    return NextResponse.json({ error: 'Invalid year' }, { status: 400 })
  }

  try {
    const { rows } = await sql`
      SELECT * FROM reunion_content
      WHERE reunion_year = ${y}
      ORDER BY sort_order ASC, content_key ASC
    `
    const content = (rows as Record<string, unknown>[]).map(rowToContent)
    return NextResponse.json(content)
  } catch (e) {
    console.error('GET /api/reunion/[year]', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
