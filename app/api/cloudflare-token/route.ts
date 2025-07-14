// app/api/cloudflare-token/route.ts

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const token = process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_UPLOAD_TOKEN;

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
      },
      cache: 'no-store',
    }
  );

  const data = await response.json();

  if (!data.success) {
    return NextResponse.json(
      { message: 'Token creation failed', error: data.errors },
      { status: 500 }
    );
  }

  return NextResponse.json(data.result, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'Pragma': 'no-cache',
    },
  });
}
  