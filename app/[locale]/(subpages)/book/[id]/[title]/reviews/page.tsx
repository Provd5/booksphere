import { Suspense } from "react";

import { ReviewsFeed } from "~/components/Review/ReviewsFeed";
import { LargeComponentLoader } from "~/components/ui/Loaders/Loader";

export default async function BookReviewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; title: string }>;
  searchParams: Promise<unknown> | undefined;
}) {
  const { id, title } = await params;
  const awaitedSearchParams = await searchParams;

  return (
    <div className="flex flex-col">
      <Suspense
        key={"BookReviewsPage-ReviewsFeed"}
        fallback={<LargeComponentLoader />}
      >
        <ReviewsFeed
          bookId={id}
          bookTitle={title}
          searchParams={awaitedSearchParams}
        />
      </Suspense>
    </div>
  );
}
