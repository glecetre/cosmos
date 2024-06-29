import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
    EDIT_CHRONICLE_FORM_ID,
    EditChronicleForm,
} from '@/app/cosmogonies/[cosmogonyCode]/chronicles/[chronicleCode]/edit/EditChronicleForm';
import { Button } from '@/components/Button';
import { Page } from '@/components/Page';
import { chroniclesApi } from '@/data/chronicles';
import { pageHtmlTitle } from '@/utils';

type EditChroniclePageProps = {
    params: { chronicleCode: string; cosmogonyCode: string };
};

export async function generateMetadata(
    props: EditChroniclePageProps
): Promise<Metadata> {
    const chronicle = await chroniclesApi.getByCode(props.params.chronicleCode);

    if (!chronicle) {
        return {};
    }

    return {
        title: pageHtmlTitle(
            `Edit ${chronicle.title} in ${chronicle.cosmogony.name}`
        ),
    };
}

export default async function EditChroniclePagePage(
    props: EditChroniclePageProps
) {
    const chronicle = await chroniclesApi.getByCode(props.params.chronicleCode);

    if (
        !chronicle ||
        chronicle.cosmogony.shortCode !== props.params.cosmogonyCode
    ) {
        return notFound();
    }

    return (
        <Page
            title={`Edit chronicle`}
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
