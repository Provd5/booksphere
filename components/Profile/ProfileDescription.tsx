"use client";

import { type FC, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";

import { ButtonLink } from "../ui/Buttons";

interface ProfileDescriptionProps {
  description: string;
}

export const ProfileDescription: FC<ProfileDescriptionProps> = ({
  description,
}) => {
  const t = useTranslations("Profile.Page");
  const to = useTranslations("Other");

  const [renderButton, setRenderButton] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (descriptionRef.current && descriptionRef.current.clientHeight >= 78) {
      setRenderButton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [descriptionRef.current]);

  return (
    <div>
      <div className="mt-3 flex flex-col">
        <h1 className="mb-0.5 text-sm font-semibold">
          {t("profile description:")}
        </h1>
        <p
          ref={descriptionRef}
          className={clsx(
            "mx-0.5 text-xs",
            !isExpanded && "line-clamp-6 max-h-[78px]"
          )}
        >
          {description}
        </p>
      </div>
      {renderButton && (
        <ButtonLink
          className="mx-auto"
          size="sm"
          active={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? to("collapse") : to("expand")}
        </ButtonLink>
      )}
    </div>
  );
};
