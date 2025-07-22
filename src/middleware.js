
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { routes } from './contants/routes';

export async function middleware(request) {
  // phải cung cấp biến NEXTAUTH_SECRET trong file .env để không sử dụng option secret: process.env.NEXTAUTH_SECRET
  const session = await getToken({ 
    req: request
  })
  // if (!session) {
  //   return NextResponse.redirect(new URL(routes.signin, request.url))
  // }

  return  NextResponse.next()
}

// router ở đây không được import biến vào
export const config = {
  runtime: 'nodejs',
    matcher: [
      '/',
    ],
  }
  