import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Only allow access if token exists
      return !!token;
    },
  },
  pages: {
    signIn: '/auth/signin',  // Custom sign-in page
    error: '/auth/error',    // Error page
  }
});

// Match all protected routes
export const config = {
  matcher: [
    '/single-slot-booking/:path*',
    '/',
    // Add other protected routes here
  ]
};