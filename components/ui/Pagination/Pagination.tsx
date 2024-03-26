"use client";

import { type FC, type TransitionStartFunction } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "../Buttons";

interface PaginationProps {
  startTransition: TransitionStartFunction;
  currentPage: number;
  totalPages: number;
}

export const Pagination: FC<PaginationProps> = ({
  startTransition,
  currentPage,
  totalPages,
}) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();

  const changePage = (page: number) => {
    params.delete("page");
    const query = params.toString() !== "" ? `&${params.toString()}` : "";

    startTransition(() => {
      router.push(`?page=${page}` + query);
    });
  };

  return (
    <>
      <div className="mb-6 mt-12 flex items-center justify-between gap-3">
        {currentPage > 1 ? (
          <Button onClick={() => changePage(currentPage - 1)} size="sm">
            previous page
          </Button>
        ) : (
          <div />
        )}
        {currentPage < totalPages ? (
          <Button onClick={() => changePage(currentPage + 1)} size="sm">
            next page
          </Button>
        ) : (
          <div />
        )}
      </div>
    </>
  );
};
