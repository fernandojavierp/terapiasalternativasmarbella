// app/api/auth/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('admin_session');
    
    if (!sessionCookie?.value) {
      return NextResponse.json({ authenticated: false });
    }

    const userData = JSON.parse(sessionCookie.value);
    
    return NextResponse.json({
      authenticated: true,
      user: userData
    });
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json({ authenticated: false });
  }
}