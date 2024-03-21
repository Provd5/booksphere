"use client";

import { type FC } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { MdNavigateNext } from "react-icons/md";

import { type GetProfileInterface } from "~/types/data/profile";

import ROUTES from "~/utils/routes";

import { BookmarkIcon } from "../ui/Icons/BookmarkIcon";
import { AvatarImage } from "./AvatarImage";
import { FollowButton } from "./Follows/FollowButton";

interface ProfileCardProps {
  profileData: GetProfileInterface;
}

export const ProfileCard: FC<ProfileCardProps> = ({ profileData }) => {
  const t = useTranslations("Explore.ProfileCard");

  if (!profileData.full_name) return;

  return (
    <div className="flex h-full w-full max-w-[400px] flex-col gap-2 rounded-md bg-white px-6 py-3 drop-shadow dark:bg-black">
      <div className="flex flex-auto flex-col gap-1">
        <Link
          href={ROUTES.profile.root(profileData.full_name)}
          className="flex gap-1"
        >
          <AvatarImage
            size="sm"
            className="drop-shadow-icon"
            avatarSrc={profileData.avatar_url}
          />
          <div className="flex w-full flex-col gap-0.5">
            <h1 className="line-clamp-2 break-all text-sm font-bold">
              {profileData.full_name}
            </h1>
            <div className="my-0.5 flex gap-1.5">
              <div className="flex items-center gap-0.5">
                <BookmarkIcon category="ALREADY_READ" size="sm" />
                <p>{profileData._count.bookshelf}</p>
              </div>
              <div className="flex items-center gap-0.5">
                <BookmarkIcon category="REVIEWS" size="sm" />
                <p>{profileData._count.review}</p>
              </div>
              <div className="flex items-center gap-0.5">
                <BookmarkIcon category="LIKED" size="sm" />
                <p>{profileData._count.liked_book}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <MdNavigateNext className="h-8 w-8" />
          </div>
        </Link>
        <div className="flex flex-col gap-0.5 text-xs">
          <p>
            <span>{t("owned books:")} </span>
            {profileData._count.book_owned_as}
          </p>
          <p>
            <span>{t("followers:")} </span>
            {profileData._count.followed_by}
          </p>
          {profileData.description && (
            <div>
              <h2 className="text-black-light dark:text-white-dark">
                {t("profile description:")}
              </h2>
              <p className="line-clamp-3">{profileData.description}</p>
            </div>
          )}
        </div>
      </div>
      <FollowButton userId={profileData.id} />
    </div>
  );
};