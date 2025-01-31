import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isAdmin } from '@/auth';
import { Button } from '@/components/Button';
import { Markdown } from '@/components/Markdown';
import { Page } from '@/components/Page';
import { chroniclesApi } from '@/data/chronicles';
import { pageHtmlTitle } from '@/utils';

type ChroniclePageProps = {
    params: { chronicleCode: string; cosmogonyCode: string };
};

export async function generateMetadata(
    props: ChroniclePageProps
): Promise<Metadata> {
    const chronicle = await chroniclesApi.getByCode(props.params.chronicleCode);

    if (!chronicle) {
        return {};
    }

    return {
        title: pageHtmlTitle(
            `${chronicle.title} in ${chronicle.cosmogony.name}`
        ),
    };
}

export default async function ChroniclePage(props: ChroniclePageProps) {
    const canEdit = await isAdmin();
    const chronicle = await chroniclesApi.getByCode(props.params.chronicleCode);

    if (
        !chronicle ||
        chronicle.cosmogony.shortCode !== props.params.cosmogonyCode
    ) {
        return notFound();
    }

    return (
        <Page
            title={chronicle.title}
            subtitle={`Chronicle in ${chronicle.cosmogony.name}`}
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
                canEdit && (
                    <Button
                        key="edit"
                        use="link"
                        variant="pageAction"
                        href={`/cosmogonies/${chronicle.cosmogony.shortCode}/chronicles/${chronicle.shortCode}/edit`}
                    >
                        Edit
                    </Button>
                ),
            ]}
        >
            <Markdown>{chronicle.markdown}</Markdown>
        </Page>
    );
}
