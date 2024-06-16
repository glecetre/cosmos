import { notFound } from 'next/navigation';
import {
    EDIT_CHRONICLE_FORM_ID,
    EditChronicleForm,
} from '@/app/[cosmogonySlug]/chronicles/[chronicleSlug]/edit/EditChronicleForm';
import { Button } from '@/components/Button';
import { Page } from '@/components/Page';
import { getChronicleBySlug } from '@/data/chronicles';
import { getCosmogonyBySlug } from '@/data/cosmogonies';

export type CharacterEditPageProps = {
    params: {
        cosmogonySlug: string;
        chronicleSlug: string;
    };
};

export default async function ChronicleEditPage(props: CharacterEditPageProps) {
    const cosmogony = await getCosmogonyBySlug(props.params.cosmogonySlug);
    const chronicle = await getChronicleBySlug(props.params.chronicleSlug);

    if (!chronicle) {
        return notFound();
    }

    return (
        <Page
            title={`Editing chronicle`}
            breadcrumbs={[
                { text: cosmogony.name, href: `/${cosmogony.slug}` },
                { text: 'Chronicles', href: `/${cosmogony.slug}/chronicles` },
                {
                    text: chronicle.title,
                    href: `/${cosmogony.slug}/chronicles/${chronicle.slug}`,
                },
            ]}
            actions={[
                <Button
                    key="save"
                    href={`/${cosmogony.slug}/chronicles/${chronicle.slug}`}
                    variant="pageAction"
                    primary
                    form={EDIT_CHRONICLE_FORM_ID}
                >
                    Save
                </Button>,
                <Button
                    key="cancel"
                    use="link"
                    href={`/${cosmogony.slug}/chronicles/${chronicle.slug}`}
                    variant="pageAction"
                >
                    Cancel
                </Button>,
            ]}
        >
            <EditChronicleForm cosmogony={cosmogony} chronicle={chronicle} />
        </Page>
    );
}
