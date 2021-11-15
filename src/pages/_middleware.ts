import { NextRequest, NextResponse } from 'next/server';
import { getURL } from '@lib/utility/supabase';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname.split('/')[1];

  if (['favicon.ico', 'api', ''].includes(pathname)) return;

  const data = await getURL(pathname);

  if (!data || data.length === 0) return;

  const url = data[0].url;

  return NextResponse.redirect(url);
}
