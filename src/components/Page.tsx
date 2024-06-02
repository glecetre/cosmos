import { ReactNode } from "react";

export type PageProps = {
  title: string;
  subtitle?: string;
  children: ReactNode | ReactNode[];
};

export function Page(props: PageProps) {
  return (
    <>
      <h2 className="text-center text-4xl font-bold text-balance">
        {props.title}
      </h2>
      {props.subtitle && (
        <h3 className="text-center text-lg text-black/50 text-balance">
          {props.subtitle}
        </h3>
      )}
      <main className="prose-h1:mt-12 prose-h1:text-2xl prose-h2:text-xl mt-20 px-8">
        {props.children}
      </main>
    </>
  );
}
