import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
});

/**
 * Throws an error if the user is not an admin or not connected.
 */
export async function throwIfUnauthorized() {
    const isAuthorized = await isAdmin();

    if (!isAuthorized) {
        throw new Error('Unauthorized');
    }
}

/**
 * Check whether the current user is admin.
 * @returns `true` if the current user is admin.
 */
export async function isAdmin() {
    const session = await auth();

    return (
        process.env.AUTH_ADMIN_EMAIL &&
        session?.user?.email === process.env.AUTH_ADMIN_EMAIL
    );
}
