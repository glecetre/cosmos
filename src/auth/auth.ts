import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
});

/**
 * Throws an error if there is not user session.
 */
export async function throwIfUnauthorized() {
    const session = await auth();

    if (!session) {
        throw new Error('Unauthorized');
    }
}
