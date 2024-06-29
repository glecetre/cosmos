import type { Session } from 'next-auth';
import { Button } from '@/components/Button';

type SignOutFormProps = {
    session: Session;
    action: () => void;
};

export function SignOutForm(props: SignOutFormProps) {
    return (
        <form action={props.action}>
            <p className="text-center">
                {props.session.user?.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={props.session.user?.image}
                        alt="User image"
                        className="mx-auto mb-2 size-40 border border-black/20"
                    />
                )}
                You are signed in as{' '}
                <span className="font-bold">{props.session.user?.name}</span>.
            </p>
            <p className="mt-6 text-center">
                <Button variant="button" primary type="submit">
                    Sign out
                </Button>
            </p>
        </form>
    );
}
