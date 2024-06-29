import { Metadata } from 'next';
import { auth, signIn as authSignIn, signOut as authSignOut } from '@/auth';
import { SignInForm } from '@/components/Auth';
import { SignOutForm } from '@/components/Auth/SignOutForm';
import { Page } from '@/components/Page';
import { pageHtmlTitle } from '@/utils';

export const metadata: Metadata = {
    title: pageHtmlTitle('Sign In'),
};

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
