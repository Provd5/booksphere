"use client";

import { type FC, useState } from "react";
import { useTranslations } from "next-intl";

import { FaPenToSquare } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

import { type ReviewCardDataInterface } from "~/types/feed/ReviewCardDataInterface";

import { useFetchData } from "~/hooks/useFetchData";
import { findMyReaction } from "~/utils/findMyReaction";

import { ReviewCardLoader } from "../ui/Loaders/Skeletons/ReviewCardLoader";
import { CreateReview } from "./CreateReview";
import { ReviewCard } from "./ReviewCard";

interface MyReviewProps {
  bookId: string;
  sessionId: string | undefined;
}

export const MyReview: FC<MyReviewProps> = ({ bookId, sessionId }) => {
  const t = useTranslations("Reviews.CreateReview");

  const [refreshData, setRefreshData] = useState<"asc" | "desc">("desc");

  const { fetchedData, isLoading } = useFetchData({
    fetchType: "reviews",
    bookId,
    isMyReview: true,
    takeLimit: 1,
    order: refreshData,
  });
  const reviewsData = fetchedData as ReviewCardDataInterface[];

  const myReviewData = reviewsData ? reviewsData[0] : undefined;
  const myReaction = myReviewData
    ? findMyReaction(myReviewData.review_reaction, sessionId)
    : undefined;

  const [showCreateReview, setShowCreateReview] = useState(!!myReviewData);

  return !sessionId ? (
    <div className="flex flex-col justify-center gap-3 p-6 text-center text-md text-gray">
      <h1>{t("log in to add your review")}</h1>
    </div>
  ) : (
    <>
      <div className="flex w-full justify-end">
        {!!myReviewData ? (
          <button
            id="review-edit-button"
            className="flex items-center gap-1 px-3 py-1"
            onClick={() => setShowCreateReview(!showCreateReview)}
          >
            {showCreateReview ? (
              <>
                <p className="select-none text-base text-black-light/50 dark:text-white-dark/50">
                  {t("cancel")}
                </p>
                <RxCross2 className="text-md text-black-light dark:text-white-dark" />
              </>
            ) : (
              <>
                <p className="select-none text-base text-black-light/50 dark:text-white-dark/50">
                  {t("edit")}
                </p>
                <FaPenToSquare className="text-md text-black-light dark:text-white-dark" />
              </>
            )}
          </button>
        ) : (
          <div className="my-0.5 h-6" />
        )}
      </div>
      {isLoading ? (
        <ReviewCardLoader isMyReview index={0} />
      ) : myReviewData && !showCreateReview ? (
        <ReviewCard
          isMyReview
          reviewData={myReviewData}
          myReaction={myReaction}
        />
      ) : (
        <CreateReview
          isReviewExists={!!myReviewData}
          bookId={bookId}
          avatarUrl={myReviewData?.profile.avatar_url}
          fullName={myReviewData?.profile.full_name}
          rate={myReviewData?.rate}
          text={myReviewData?.text}
          closeReview={() => {
            setShowCreateReview(false),
              setRefreshData(refreshData === "desc" ? "asc" : "desc");
          }}
        />
      )}
    </>
  );
};
