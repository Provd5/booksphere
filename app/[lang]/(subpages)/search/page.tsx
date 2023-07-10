import { type Metadata } from "next";

import { getTranslator } from "~/dictionaries";

import { type PageProps } from "../../layout";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { Search } = await getTranslator(params.lang);

  return {
    title: `${Search.categoryTitle} | Being Thesis`,
  };
}

export default async function SearchPage({ params }: PageProps) {
  const { Search } = await getTranslator(params.lang);

  return (
    <>
      <div>{Search.categoryTitle}</div>
    </>
  );
}
