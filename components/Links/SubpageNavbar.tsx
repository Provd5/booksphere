import type { FC } from "react";

import { SubpageNavbarButton } from "./SubpageNavbarButton";

export const SubpageNavbar: FC = ({}) => {
  return (
    <div className="flex h-14 w-full flex-none justify-center rounded-t-3xl bg-white dark:bg-black md:rounded-none">
      <div className="flex w-full max-w-[400px] justify-center">
        <SubpageNavbarButton pageVariant="explore" />
      </div>
      <div className="flex w-full max-w-[400px] justify-center">
        <SubpageNavbarButton pageVariant="community" />
      </div>
    </div>
  );
};
