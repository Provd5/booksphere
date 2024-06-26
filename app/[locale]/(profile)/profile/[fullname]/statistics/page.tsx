import { Suspense } from "react";
import { type Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { BackCategoryLink } from "~/components/Links/BackCategoryLink";
import { AlreadyReadStatisticsCard } from "~/components/Profile/Statistics/AlreadyReadStatistics/AlreadyReadStatisticsCard";
import { MainStatisticsCard } from "~/components/Profile/Statistics/MainStatistics/MainStatisticsCard";
import { OwnedAsStatisticsCard } from "~/components/Profile/Statistics/OwnedAsStatistics/OwnedAsStatisticsCard";
import { StatisticsCategoryWrapper } from "~/components/Profile/Statistics/StatisticsCategoryWrapper";
import { LargeComponentLoader } from "~/components/ui/Loaders/Loader";
import { type localeTypes } from "~/i18n";
import ROUTES from "~/utils/routes";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: localeTypes };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Nav.CategoryTitles" });
  return {
    title: t("statistics"),
  };
}

export default function StatisticsPage({
  params: { fullname, locale },
}: {
  params: { fullname: string; locale: localeTypes };
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <BackCategoryLink variant="RETURN" href={ROUTES.profile.back(fullname)} />
      <div className="flex flex-col justify-center gap-3">
        {/* all categories statistics */}
        <StatisticsCategoryWrapper variant="profile statistics">
          <Suspense
            key="profile statistics"
            fallback={<LargeComponentLoader />}
          >
            <MainStatisticsCard profileName={fullname} />
          </Suspense>
        </StatisticsCategoryWrapper>

        {/* owned statistics */}
        <StatisticsCategoryWrapper variant="owned books">
          <Suspense
            key="owned books statistics"
            fallback={<LargeComponentLoader />}
          >
            <OwnedAsStatisticsCard profileName={fullname} />
          </Suspense>
        </StatisticsCategoryWrapper>

        {/* reading statistics */}
        <StatisticsCategoryWrapper variant="read books">
          <Suspense
            key="read books statistics"
            fallback={<LargeComponentLoader />}
          >
            <AlreadyReadStatisticsCard profileName={fullname} />
          </Suspense>
        </StatisticsCategoryWrapper>
      </div>
    </>
  );
}
