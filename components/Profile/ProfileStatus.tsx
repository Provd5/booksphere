"use client";

import type { FC } from "react";
import { useTranslations } from "next-intl";

interface ProfileStatusProps {
  isPrivate: boolean;
}

export const ProfileStatus: FC<ProfileStatusProps> = ({ isPrivate }) => {
  const t = useTranslations("Profile.Page");

  return (
    <p className="absolute left-full top-2.5 whitespace-nowrap text-sm font-normal text-white">
      {t("public/private profile", { view: isPrivate ? "private" : "public" })}
    </p>
  );
};
