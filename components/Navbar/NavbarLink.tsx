"use client";

import type { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { type Locale, locales } from "~/dictionaries";

import { SvgPainter } from "../ui/SvgPainter";

interface NavbarLinkProps {
  href: `/${string}`;
  text: string;
  children: React.ReactNode;
  big?: boolean;
}

export const NavbarLink: FC<NavbarLinkProps> = ({
  href,
  text,
  children,
  big,
}) => {
  const pathname = usePathname();
  const pathnameWithoutLocale: string[] | undefined = pathname
    .split("/")
    .filter((element) => !locales.includes(element as Locale));

  const isActive = (pathnameWithoutLocale[1] ?? "") === href.split("/")[1];

  return (
    <Link
      href={href}
      className={
        "flex shrink-0 items-center justify-center rounded-full hover:bg-white-light/50 dark:hover:bg-black-dark/50 " +
        (big ? "h-[52px] w-[52px]" : "h-[48px] w-[48px]") +
        (isActive ? " bg-white-light dark:bg-black-dark" : "")
      }
    >
      <div className="mt-[-4px] flex flex-col items-center justify-center gap-0.5">
        <SvgPainter className={big ? "h-7 w-7" : "h-6 w-6"}>
          {children}
        </SvgPainter>
        <p className="text-2xs">{text}</p>
      </div>
    </Link>
  );
};
