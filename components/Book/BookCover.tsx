import type { FC } from "react";
import Image from "next/image";
import clsx from "clsx";

interface BookCoverProps {
  coverUrl: string | null;
  size?: "default" | "lg";
}

export const BookCover: FC<BookCoverProps> = ({
  coverUrl,
  size = "default",
}) => {
  const sizes = {
    default: "97px",
    lg: "121px",
  };
  const sizeClass = {
    default: "h-[140px] w-[97px]",
    lg: "h-[175px] w-[121px]",
  };

  return (
    <div
      className={clsx(
        "relative shrink-0 overflow-hidden rounded-sm drop-shadow-book",
        sizeClass[size]
      )}
    >
      {coverUrl ? (
        <Image
          alt="Book cover"
          src={coverUrl}
          fill
          priority
          sizes={sizes[size]}
          className="pointer-events-none object-cover"
        />
      ) : (
        <ThumbnailPlaceholder />
      )}
    </div>
  );
};

const ThumbnailPlaceholder: FC = () => {
  return (
    <svg
      className="pointer-events-none h-full w-full fill-white-light dark:fill-white-dark"
      viewBox="0 0 97 140"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M96.34 0H0V140H96.34V0ZM37.0571 34.1205C40.7134 33.7655 44.7297 34.1096 47.5 36.4227C50.2703 34.1096 54.2866 33.7627 57.9429 34.1205C62.2009 34.5383 66.4984 35.9557 69.1759 37.1383C69.4216 37.2467 69.6299 37.4216 69.7761 37.642C69.9222 37.8623 69.9999 38.1188 70 38.3809V68.4218C70 68.5146 69.9901 68.6069 69.9709 68.6973C69.9429 68.829 69.8949 68.9565 69.8281 69.0756C69.7153 69.2761 69.5526 69.4459 69.3547 69.5696C69.157 69.6932 68.9303 69.7667 68.6956 69.7832C68.4609 69.7998 68.2257 69.7589 68.0116 69.6643C65.5337 68.5719 61.5344 67.2583 57.6587 66.8787C53.6987 66.4908 50.3772 67.1163 48.5969 69.2738C48.4651 69.4332 48.2981 69.562 48.1083 69.6504C47.9185 69.7389 47.7106 69.7848 47.5 69.7848C47.3665 69.7848 47.234 69.7662 47.1064 69.7301C47.033 69.7094 46.9612 69.6827 46.8917 69.6504C46.8212 69.6176 46.7537 69.5791 46.6901 69.5355C46.5825 69.462 46.4858 69.3739 46.4031 69.2738C44.6228 67.1163 41.3013 66.4908 37.3384 66.8787C33.4656 67.2583 29.4691 68.5719 26.9884 69.6643C26.7743 69.7589 26.5391 69.7998 26.3044 69.7832C26.0697 69.7667 25.843 69.6932 25.6453 69.5696C25.5466 69.5079 25.4568 69.4348 25.3774 69.3522C25.2976 69.269 25.2285 69.1761 25.1719 69.0756C25.0592 68.875 25.0001 68.6501 25 68.4218V38.3809C25.0001 38.1188 25.0778 37.8623 25.2239 37.642C25.37 37.4216 25.5784 37.2467 25.8241 37.1383C28.5016 35.9557 32.7991 34.5383 37.0571 34.1205Z"
      />
    </svg>
  );
};