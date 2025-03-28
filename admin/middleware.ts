import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server'

interface UserMetadata {
  role?: string;
}

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();


  if (req.nextUrl.pathname.startsWith('/sign-in')) {
    return;
  }


  if (!userId) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }


  const isAdmin = userId === process.env.NEXT_PUBLIC_ADMIN_ID;
  if (!isAdmin) {
    console.log(userId);
    console.log('Not admin');

    const signOutUrl = new URL('/sign-in', req.url);
    signOutUrl.searchParams.set('redirect_url', '/');
    return redirectToSignIn()
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
