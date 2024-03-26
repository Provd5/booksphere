import { type FC, Suspense } from "react";
import { type ReadonlyURLSearchParams } from "next/navigation";
import { URLSearchParams } from "url";

import { SortReviewsArray } from "~/types/orderArrays";

import { getAllReviews } from "~/lib/services/review";
import ROUTES from "~/utils/routes";
import { sortParamsValidator } from "~/utils/sortParamsValidator";

import { BackCategoryLink } from "../Links/BackCategoryLink";
import { FeedSort } from "../Modals/FeedSort";
import { BookReviewCardsLoader } from "../ui/Loaders/Skeletons/BookReviewCardLoader";
import { NotFoundItems } from "../ui/NotFound/NotFoundItems";
import { ReviewCard } from "./ReviewCard/ReviewCard";

interface ReviewsFeedProps {
  bookTitle: string;
  bookId: string;
  searchParams: ReadonlyURLSearchParams;
}

export const ReviewsFeed: FC<ReviewsFeedProps> = async ({
  bookTitle,
  bookId,
  searchParams,
}) => {
  const params = new URLSearchParams(searchParams);
  const from = params.get("from");
  const reviews = await getAllReviews(bookId, searchParams);

  const validSearchParams = sortParamsValidator(searchParams, SortReviewsArray);

  return (
    <>
      <BackCategoryLink
        href={{
          pathname: ROUTES.book.back(bookTitle),
          query: { from, ...validSearchParams },
        }}
        variant="MY_REVIEW"
        replace
      />
      {reviews.allItems === 0 ? (
        <NotFoundItems itemType="reviews" />
      ) : (
        <FeedSort
          currentPage={reviews.page}
          totalPages={reviews.totalPages}
          orderArray={SortReviewsArray}
        >
          <div className="grid grid-cols-1 gap-3">
            <Suspense
              fallback={<BookReviewCardsLoader items={reviews.itemsPerPage} />}
            >
              {reviews.data.map((review) => (
                <ReviewCard key={review.id} reviewData={review} />
              ))}
            </Suspense>
          </div>
        </FeedSort>
      )}
    </>
  );
};
