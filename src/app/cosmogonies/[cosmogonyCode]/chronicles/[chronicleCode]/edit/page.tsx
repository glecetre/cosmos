import { notFound } from 'next/navigation';
import {
    EDIT_CHRONICLE_FORM_ID,
    EditChronicleForm,
} from '@/app/cosmogonies/[cosmogonyCode]/chronicles/[chronicleCode]/edit/EditChronicleForm';
import { Button } from '@/components/Button';
import { Page } from '@/components/Page';
import { chroniclesApi } from '@/data/chronicles';

export default async function ChronicleEditPage(props: {
    params: { chronicleCode: string; cosmogonyCode: string };
}) {
    const chronicle = await chroniclesApi.getByCode(props.params.chronicleCode);

    if (
        !chronicle ||
        chronicle.cosmogony.shortCode !== props.params.cosmogonyCode
    ) {
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
                    href: `/cosmogonies/${chronicle.cosmogony.shortCode}/chronicles/${chronicle.shortCode}`,
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
                    href={`/cosmogonies/${chronicle.cosmogony.shortCode}/chronicles/${chronicle.shortCode}`}
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
