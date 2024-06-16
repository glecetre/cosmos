import { notFound } from 'next/navigation';
import {
    EDIT_CHRONICLE_FORM_ID,
    EditChronicleForm,
} from '@/app/chronicles/[chronicleCode]/edit/EditChronicleForm';
import { Button } from '@/components/Button';
import { Page } from '@/components/Page';
import { getChronicleByCode } from '@/data/chronicles';

export type CharacterEditPageProps = {
    params: {
        chronicleCode: string;
    };
};

export default async function ChronicleEditPage(props: CharacterEditPageProps) {
    const chronicle = await getChronicleByCode(props.params.chronicleCode);

    if (!chronicle) {
        return notFound();
    }

    return (
        <Page
            title={`Editing chronicle`}
            breadcrumbs={[
                {
                    text: chronicle.cosmogony.name,
                    href: `/cosmogonies/${chronicle.cosmogony.shortCode}`,
                },
                {
                    text: 'Chronicles',
                    href: `/cosmogonies/${chronicle.cosmogony.shortCode}/chronicles`,
                },
                {
                    text: chronicle.title,
                    href: `/chronicles/${chronicle.shortCode}`,
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
                    href={`/chronicles/${chronicle.shortCode}`}
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
