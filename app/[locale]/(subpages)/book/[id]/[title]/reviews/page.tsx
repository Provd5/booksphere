import { Suspense } from "react";
import { type ReadonlyURLSearchParams } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

import { ReviewsFeed } from "~/components/Review/ReviewsFeed";
import { Loader } from "~/components/ui/Loaders/Loader";
import { type localeTypes } from "~/i18n";

export default function BookReviewsPage({
  params: { id, locale },
  searchParams,
}: {
  params: { id: string; locale: localeTypes };
  searchParams: ReadonlyURLSearchParams;
}) {
  unstable_setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      <Suspense fallback={<Loader />}>
        <ReviewsFeed bookId={id} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
