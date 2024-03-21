import { Suspense } from "react";
import { unstable_setRequestLocale } from "next-intl/server";

import { Logo } from "~/components/Logo";
import { AccountSettings } from "~/components/Modals/AccountSettings";
import { Settings } from "~/components/Modals/Settings";
import { ProfileBadge } from "~/components/Profile/ProfileBadge";
import { Loader } from "~/components/ui/Loaders/Loader";
import { type localeTypes } from "~/i18n";

export default function ProfileLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: localeTypes };
}) {
  unstable_setRequestLocale(locale);

  return (
    <main className="grow-1 relative flex h-full flex-col overflow-x-hidden overflow-y-scroll scroll-smooth">
      <Logo />
      <div className="flex h-[68px] flex-none self-end p-3 text-white">
        <div className="flex h-fit gap-3">
          <AccountSettings>
            <Suspense fallback={<Loader />}>
              <ProfileBadge />
            </Suspense>
          </AccountSettings>
          <Settings />
        </div>
      </div>
      <div className="nav-padding relative flex flex-auto flex-col rounded-t-3xl bg-white/90 dark:bg-black/90 md:rounded-none">
        <div className="container pb-12">{children}</div>
      </div>
    </main>
  );
}
