import { notFound } from 'next/navigation';
import {
    EDIT_CHRONICLE_FORM_ID,
    EditChronicleForm,
} from '@/app/chronicles/[chronicleSlug]/edit/EditChronicleForm';
import { Button } from '@/components/Button';
import { Page } from '@/components/Page';
import { getChronicleBySlug } from '@/data/chronicles';

export type CharacterEditPageProps = {
    params: {
        chronicleSlug: string;
    };
};

export default async function ChronicleEditPage(props: CharacterEditPageProps) {
    const chronicle = await getChronicleBySlug(props.params.chronicleSlug);

    if (!chronicle) {
        return notFound();
    }

    return (
        <Page
            title={`Editing chronicle`}
            breadcrumbs={[
                {
                    text: chronicle.cosmogony.name,
                    href: `/${chronicle.cosmogony.slug}`,
                },
                {
                    text: 'Chronicles',
                    href: `/${chronicle.cosmogony.slug}/chronicles`,
                },
                {
                    text: chronicle.title,
                    href: `/chronicles/${chronicle.slug}`,
                },
            ]}
            actions={[
                <Button
                    key="save"
                    variant="pageAction"
                    primary
                    form={EDIT_CHRONICLE_FORM_ID}
                >
                    Save
                </Button>,
                <Button
                    key="cancel"
                    use="link"
                    href={`/chronicles/${chronicle.slug}`}
                    variant="pageAction"
                >
                    Cancel
                </Button>,
            ]}
        >
            <EditChronicleForm chronicle={chronicle} />
        </Page>
    );
}
