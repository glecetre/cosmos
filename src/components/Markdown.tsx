import MarkdownRenderer from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownProps = {
    children: string;
};

export function Markdown(props: MarkdownProps) {
    return (
        <article className="prose text-justify text-xl prose-h1:mt-12 prose-h1:text-2xl prose-h2:text-xl prose-a:font-normal prose-a:text-grandis-600">
            <MarkdownRenderer remarkPlugins={[remarkGfm]}>
                {props.children}
            </MarkdownRenderer>
        </article>
    );
}
