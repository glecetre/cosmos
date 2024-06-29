import { auth, signIn as authSignIn, signOut as authSignOut } from '@/auth';
import { SignInForm } from '@/components/Auth';
import { SignOutForm } from '@/components/Auth/SignOutForm';
import { Page } from '@/components/Page';

export default async function SignIn() {
    const session = await auth();

    async function signOut() {
        'use server';
        await authSignOut();
    }

    async function signIn() {
        'use server';
        await authSignIn('google');
    }

    return (
        <Page title="Sign In">
            {session ? (
                <SignOutForm session={session} action={signOut} />
            ) : (
                <SignInForm action={signIn} />
            )}
        </Page>
    );
}
