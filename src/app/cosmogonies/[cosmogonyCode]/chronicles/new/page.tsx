import { notFound } from 'next/navigation';
import {
    CREATE_CHRONICLE_FORM_ID,
    CreateChronicleForm,
} from '@/app/cosmogonies/[cosmogonyCode]/chronicles/new/CreateChronicleForm';
import { Button } from '@/components/Button';
import { Page } from '@/components/Page';
import { getCosmogonyByCode } from '@/data/cosmogonies';

export default async function CharacterEditPage(props: {
    params: { cosmogonyCode: string };
}) {
    const cosmogony = await getCosmogonyByCode(props.params.cosmogonyCode);

    if (!cosmogony) {
        return notFound();
    }

    return (
        <Page
            title={`Creating chronicle`}
            subtitle={`In ${cosmogony.name}`}
            breadcrumbs={[
                {
                    text: cosmogony.name,
                    href: `/cosmogonies/${cosmogony.shortCode}`,
                },
                {
                    text: 'Chronicles',
                    href: `/cosmogonies/${cosmogony.shortCode}/chronicles`,
                },
            ]}
            actions={[
                <Button
                    key="save"
                    variant="pageAction"
                    primary
                    form={CREATE_CHRONICLE_FORM_ID}
                >
                    Save
                </Button>,
                <Button
                    key="cancel"
                    use="link"
                    href={`/cosmogonies/${cosmogony.shortCode}/chronicles`}
                    variant="pageAction"
                >
                    Cancel
                </Button>,
            ]}
        >
            <CreateChronicleForm cosmogonyId={cosmogony.id} />
        </Page>
    );
}
