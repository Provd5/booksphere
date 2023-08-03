import { type DetailedHTMLProps, type FC, type HTMLAttributes } from "react";
import clsx from "clsx";

export type modalSizes = "default" | "sm" | "xs";

interface ModalWrapperProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  closeModalHandler: () => void;
  size?: modalSizes;
}

export const ModalWrapper: FC<ModalWrapperProps> = ({
  children,
  closeModalHandler,
  size = "default",
}) => {
  const sizeClass = {
    default: "px-7 py-5 rounded-lg",
    sm: "px-4 py-3 rounded-md",
    xs: "p-1 rounded-sm",
  };

  // bg-white-light/10 backdrop-blur-[1px] dark:bg-black-dark/10

  return (
    <>
      <div
        className="fixed inset-0 z-10 cursor-pointer"
        onClick={closeModalHandler}
      />
      <div
        className={clsx(
          "absolute right-0 top-full z-20 mt-1 flex cursor-default bg-white-light text-black-light drop-shadow-modal dark:bg-black-light dark:text-white",
          sizeClass[size]
        )}
      >
        {children}
      </div>
    </>
  );
};
