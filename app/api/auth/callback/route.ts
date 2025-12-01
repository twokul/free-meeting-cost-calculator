import { oauth2Client } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/?error=no_code', request.url));
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    
    const cookieStore = await cookies();
    
    // Store the tokens in a secure, HTTP-only cookie
    // We store the whole token object to handle refresh tokens if needed, 
    // though for this stateless app we might just need access_token.
    // "Stateless" requirement: we don't save to DB, but we need it for the session.
    cookieStore.set('google_tokens', JSON.stringify(tokens), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
}

