import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
    CREATE_CHARACTER_FORM_ID,
    CreateCharacterForm,
} from '@/app/cosmogonies/[cosmogonyCode]/characters/new/CreateCharacterForm';
import { Button } from '@/components/Button';
import { Page } from '@/components/Page';
import { cosmogoniesApi } from '@/data/cosmogonies';
import { pageHtmlTitle } from '@/utils';

type NewCharacterPageProps = {
    params: { cosmogonyCode: string };
};

export async function generateMetadata(
    props: NewCharacterPageProps
): Promise<Metadata> {
    const cosmogony = await cosmogoniesApi.getByCode(
        props.params.cosmogonyCode
    );

    if (!cosmogony) {
        return {};
    }

    return {
        title: pageHtmlTitle(`New character in ${cosmogony.name}`),
    };
}

export default async function NewCharacterPage(props: NewCharacterPageProps) {
    const cosmogony = await cosmogoniesApi.getByCode(
        props.params.cosmogonyCode
    );

    if (!cosmogony) {
        return notFound();
    }

    return (
        <Page
            title={`New character`}
            subtitle={`In ${cosmogony.name}`}
            breadcrumbs={[
                {
                    text: cosmogony.name,
                    href: `/cosmogonies/${cosmogony.shortCode}`,
                },
                {
                    text: 'Characters',
                    href: `/cosmogonies/${cosmogony.shortCode}/characters`,
                },
            ]}
            actions={[
                <Button
                    key="save"
                    variant="pageAction"
                    primary
                    form={CREATE_CHARACTER_FORM_ID}
                >
                    Save
                </Button>,
                <Button
                    key="cancel"
                    use="link"
                    href={`/cosmogonies/${cosmogony.shortCode}/characters`}
                    variant="pageAction"
                >
                    Cancel
                </Button>,
            ]}
        >
            <CreateCharacterForm cosmogonyId={cosmogony.id} />
        </Page>
    );
}
