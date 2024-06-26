import { type Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { SearchComponent } from "~/components/Search/SearchComponent";
import { SearchFeed } from "~/components/Search/SearchFeed";
import { type localeTypes } from "~/i18n";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: localeTypes };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Nav.CategoryTitles" });
  return {
    title: t("search"),
  };
}

export default function SearchPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: localeTypes };
  searchParams: unknown;
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <SearchComponent searchParams={searchParams}>
        <div className="container pb-12">
          <SearchFeed searchParams={searchParams} />
        </div>
      </SearchComponent>
    </>
  );
}
