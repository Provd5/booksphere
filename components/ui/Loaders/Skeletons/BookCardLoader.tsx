import type { FC } from "react";

import { BookCover } from "~/components/Book/BookCover";

import { TextLoader } from "../Loader";

interface BookCardLoaderProps {
  index: number;
}

export const BookCardLoader: FC<BookCardLoaderProps> = ({ index }) => {
  return (
    <div
      className="flex animate-pulse justify-start gap-3 sm:justify-center lg:justify-start"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <BookCover isLoader />
      <div className="flex flex-col gap-2">
        <div className="flex max-w-[300px] flex-col gap-0.5">
          <TextLoader height="h1" className="w-32" />
          <TextLoader height="h2" className="w-24" />
        </div>
        <div className="flex w-11/12 flex-wrap justify-between gap-0 gap-y-3">
          <div className="flex flex-col justify-between gap-2">
            <div className="h-12 w-36 rounded-md bg-colors-gray" />
            <div className="h-12 w-36 rounded-md bg-colors-gray" />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <div className="h-12 w-36 rounded-md bg-colors-gray" />
            <div className="h-12 w-36 rounded-md bg-colors-gray" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const BookCardsLoader: FC<{ items: number }> = ({ items }) => {
  return Array.from({ length: items }, (_, i) => (
    <BookCardLoader key={i} index={i} />
  ));
};
