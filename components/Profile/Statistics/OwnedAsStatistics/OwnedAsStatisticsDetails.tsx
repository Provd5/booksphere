"use client";

import type { FC } from "react";
import { useTranslations } from "next-intl";

import { type OwnedBooksInterface } from "~/types/data/statistics";

import { SmallBookCard } from "~/components/Book/SmallBookCard";
import { dateFormater } from "~/utils/dateFormater";

interface OwnedAsStatisticsDetailsProps {
  ownedBooks: OwnedBooksInterface;
}

export const OwnedAsStatisticsDetails: FC<OwnedAsStatisticsDetailsProps> = ({
  ownedBooks,
}) => {
  const t = useTranslations("Statistics.OwnedBooks");

  if (!ownedBooks.lastAdded || !ownedBooks.updatedAt)
    return <h1>{t("no owned books")}</h1>;

  return (
    <div className="mx-auto flex flex-col gap-3">
      <div className="flex flex-col justify-center gap-x-6 gap-y-3 md:flex-row">
        <div className="flex flex-col items-center">
          <h2 className="font-semibold">{t("last change:")}</h2>
          <span>{dateFormater(ownedBooks.updatedAt)}</span>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="font-semibold">{t("last added:")}</h2>
          <SmallBookCard bookData={ownedBooks.lastAdded} />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="font-semibold">
          {t("total owned books:")}
          <span className="text-md text-colors-primary">
            {" "}
            {ownedBooks.totalOwnedBooks}
          </span>
        </h2>
      </div>
    </div>
  );
};
