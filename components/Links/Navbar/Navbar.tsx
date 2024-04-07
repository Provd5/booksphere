import type { FC } from "react";

import { db } from "~/lib/db";
import readUserSession from "~/lib/supabase/readUserSession";

import { NavbarLink } from "./NavbarLink";

export const Navbar: FC = async () => {
  const {
    data: { session },
  } = await readUserSession();

  const userData =
    session?.user &&
    (await db.profile.findUnique({
      where: { id: session.user.id },
      select: { full_name: true },
    }));

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-50 flex h-[var(--nav-height)] flex-none items-center justify-center rounded-t-xl border-colors-gray/30 bg-colors-background text-colors-text before:absolute before:-z-10 before:size-[68px] before:rounded-full before:border-t before:border-colors-gray/30 before:bg-colors-background max-md:border-t md:sticky md:top-0 md:rounded-none md:border-b before:md:hidden">
        <div className="flex size-full max-w-sm items-center justify-between gap-3 px-8 md:max-w-7xl md:justify-end md:px-6">
          <NavbarLink pageVariant={"explore"} />
          <NavbarLink
            profileName={userData?.full_name}
            pageVariant={session ? "profile" : "login"}
          />
          <NavbarLink pageVariant="search" />
        </div>
      </nav>
    </>
  );
};
