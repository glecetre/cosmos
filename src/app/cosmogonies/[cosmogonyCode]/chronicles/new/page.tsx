import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
    CREATE_CHRONICLE_FORM_ID,
    CreateChronicleForm,
} from '@/app/cosmogonies/[cosmogonyCode]/chronicles/new/CreateChronicleForm';
import { Button } from '@/components/Button';
import { Page } from '@/components/Page';
import { cosmogoniesApi } from '@/data/cosmogonies';
import { pageHtmlTitle } from '@/utils';

type NewChroniclePageProps = {
    params: { cosmogonyCode: string };
};

export async function generateMetadata(
    props: NewChroniclePageProps
): Promise<Metadata> {
    const cosmogony = await cosmogoniesApi.getByCode(
        props.params.cosmogonyCode
    );

    if (!cosmogony) {
        return {};
    }

    return {
        title: pageHtmlTitle(`New chronicle in ${cosmogony.name}`),
    };
}

export default async function NewChroniclePage(props: NewChroniclePageProps) {
    const cosmogony = await cosmogoniesApi.getByCode(
        props.params.cosmogonyCode
    );

    if (!cosmogony) {
        return notFound();
    }

    return (
        <Page
            title={`New chronicle`}
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
