import { auth, isAdmin } from '@/auth';

const PROTECTED_ROUTES = [
    /\/cosmogonies\/[a-z-_0-9]{10}\/characters\/new/i,
    /\/cosmogonies\/[a-z-_0-9]{10}\/characters\/[a-z-_0-9]{10}\/edit/i,
    /\/cosmogonies\/[a-z-_0-9]{10}\/chronicles\/new/i,
    /\/cosmogonies\/[a-z-_0-9]{10}\/chronicles\/[a-z-_0-9]{10}\/edit/i,
];

export const middleware = auth(async (req) => {
    const isAuthorized = await isAdmin();

    if (isRouteProtected(req.nextUrl.pathname) && !isAuthorized) {
        const newUrl = new URL('/signin', req.nextUrl.origin);
        return Response.redirect(newUrl);
    }
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icons.svg).*)'],
};

/**
 * Check whether a route is protected.
 * @param destination Route to test for protection.
 * @returns `true` if protected, `false` otherwise.
 */
function isRouteProtected(destination: string) {
    return PROTECTED_ROUTES.some((protectedRoute) =>
        protectedRoute.test(destination)
    );
}
