import type { FC } from "react";

const className =
  "h-full w-full fill-[var(--svg-gradient-dark)] dark:fill-[var(--svg-gradient)] drop-shadow-icon";

export const AsEbook: FC = () => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 40C5 59.33 20.67 75 40 75C59.33 75 75 59.33 75 40C75 20.67 59.33 5 40 5C20.67 5 5 20.67 5 40ZM40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0Z"
      />
      <path d="M54.375 15H25.2083C23.827 15 22.5022 15.5487 21.5255 16.5255C20.5487 17.5022 20 18.827 20 20.2083V59.7917C20 60.4756 20.1347 61.1529 20.3965 61.7848C20.6582 62.4167 21.0418 62.9909 21.5255 63.4745C22.0091 63.9582 22.5833 64.3418 23.2152 64.6035C23.8471 64.8653 24.5244 65 25.2083 65H54.375C55.059 65 55.7362 64.8653 56.3681 64.6035C57 64.3418 57.5742 63.9582 58.0578 63.4745C58.5415 62.9909 58.9251 62.4167 59.1869 61.7848C59.4486 61.1529 59.5833 60.4756 59.5833 59.7917V20.2083C59.5833 18.827 59.0346 17.5022 58.0578 16.5255C57.0811 15.5487 55.7563 15 54.375 15ZM39.7917 62.9167C38.0625 62.9167 36.6667 61.5208 36.6667 59.7917C36.6667 58.0625 38.0625 56.6667 39.7917 56.6667C41.5208 56.6667 42.9167 58.0625 42.9167 59.7917C42.9167 61.5208 41.5208 62.9167 39.7917 62.9167ZM55.4167 54.5833H24.1667V21.25H55.4167V54.5833Z" />
    </svg>
  );
};

export const AsAudiobook: FC = () => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 40C5 59.33 20.67 75 40 75C59.33 75 75 59.33 75 40C75 20.67 59.33 5 40 5C20.67 5 5 20.67 5 40ZM40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0Z"
      />
      <path d="M20 38H27.5C30.2614 38 32.5 40.2385 32.5 43V55.5C32.5 58.2615 30.2614 60.5 27.5 60.5H20C17.2386 60.5 15 58.2615 15 55.5V38C15 24.1929 26.1929 13 40 13C53.807 13 65 24.1929 65 38V55.5C65 58.2615 62.7615 60.5 60 60.5H52.5C49.7385 60.5 47.5 58.2615 47.5 55.5V43C47.5 40.2385 49.7385 38 52.5 38H60C60 26.9543 51.0457 18 40 18C28.9543 18 20 26.9543 20 38Z" />
    </svg>
  );
};

export const AsBook: FC = () => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 40C5 59.33 20.67 75 40 75C59.33 75 75 59.33 75 40C75 20.67 59.33 5 40 5C20.67 5 5 20.67 5 40ZM40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0Z"
      />
      <path d="M24.53 54H60C61.1046 54 62 53.1046 62 52V19C62 17.6739 61.4732 16.4021 60.5355 15.4645C59.5979 14.5268 58.3261 14 57 14H24.5C21.485 14 17 15.9975 17 21.5V56.5C17 62.0025 21.485 64 24.5 64H60C61.1046 64 62 63.1046 62 62V61C62 59.8954 61.1046 59 60 59H24.53C23.375 58.97 22 58.5125 22 56.5C22 54.4875 23.375 54.03 24.53 54ZM29.5 26C29.5 24.8954 30.3954 24 31.5 24H50C51.1046 24 52 24.8954 52 26V27C52 28.1046 51.1046 29 50 29H31.5C30.3954 29 29.5 28.1046 29.5 27V26Z" />
    </svg>
  );
};