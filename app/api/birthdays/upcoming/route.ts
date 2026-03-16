/**
 * GET /api/birthdays/upcoming - Upcoming birthdays (next 7 days), auth required.
 */

import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/get-session'
import { sql } from '@/lib/db'
import type { Birthday } from '@/types'

function rowToBirthday(row: Record<string, unknown>): Birthday {
  return {
    id: row.id as string,
    memberId: row.id as string,
    name: (row.name as string) ?? '',
    birthdate: new Date(row.birth_date as string),
    photo: row.profile_photo_url as string | undefined,
  }
}

export async function GET(request: Request) {
  const session = await getSession(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { rows } = await sql`
      SELECT fm.id, fm.birth_date, fm.profile_photo_url, u.name
      FROM family_members fm
      LEFT JOIN users u ON u.id = fm.user_id
      WHERE fm.show_birthday = true AND fm.birth_date IS NOT NULL
      ORDER BY EXTRACT(MONTH FROM fm.birth_date), EXTRACT(DAY FROM fm.birth_date)
      LIMIT 100
    `
    const today = new Date()
    const end = new Date(today)
    end.setDate(end.getDate() + 7)
    const isInNext7Days = (d: Date) => {
      const m = d.getMonth()
      const day = d.getDate()
      for (let i = 0; i <= 7; i++) {
        const t = new Date(today)
        t.setDate(t.getDate() + i)
        if (t.getMonth() === m && t.getDate() === day) return true
      }
      return false
    }
    const list = (rows as Record<string, unknown>[])
      .filter((r) => {
        const bd = r.birth_date as string
        const d = new Date(bd)
        return isInNext7Days(d)
      })
      .slice(0, 30)
      .map(rowToBirthday)
    return NextResponse.json(list)
  } catch (e) {
    console.error('GET /api/birthdays/upcoming', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
