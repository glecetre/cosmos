import { Button } from '@/components/Button';

type SignInFormProps = {
    action: () => void;
};

export function SignInForm(props: SignInFormProps) {
    return (
        <form action={props.action}>
            <p className="text-center">Sign in to be able to edit pages.</p>
            <p className="mt-4 text-center">
                <Button variant="button" primary type="submit">
                    Sign in with Google
                </Button>
            </p>
        </form>
    );
}
