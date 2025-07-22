import MainLayout from "@/layouts/MainLayout";

import "./styles.scss";
import {
  TagsSmallVideoListPage,
} from "@/components/tags-small-video-list-page";
import { TagsAllPreferencesListPage } from "@/components/tags-all-preferences-list-page";
import Image from "next/image";
import { TagsRecommendListPage } from "@/components/tags-recommend-list-page";
import { TagsAllClassesListPage } from "@/components/tags-all-classes-list-page";
import { TagsFullTariffListPage } from "@/components/tags-full-tariff-list-page";
import { ListPageRow } from "@/components/list-page-row";
import { TabsListPage } from "@/components/tabs-list-page";
import { Suspense } from "react";
import { routes } from "@/contants/routes";

// export const metadata = {
//     title: '午夜AV-免费成人视频分享网站',
//     description: `午夜AV-免费成人视频分享网站`,
//     openGraph: {
//       title: '午夜AV-免费成人视频分享网站',
//       description: `午夜AV-免费成人视频分享网站`,
//     },
//     openGraph: {
//       // images: `${process.env.NEXTAUTH_URL}/images/banner1.jpeg`,
//     },
//   }

export default function ListPageJapan({ }) {
  const cidValue = 'japan';

  return (
    <MainLayout>
      <Suspense>
        <div className="d-flex">
          <div className="container-tags">
            <TagsSmallVideoListPage />
            <TagsAllPreferencesListPage cidValue={cidValue}></TagsAllPreferencesListPage>
            <TagsRecommendListPage></TagsRecommendListPage>
            <TagsAllClassesListPage></TagsAllClassesListPage>
            <TagsFullTariffListPage></TagsFullTariffListPage>
          </div>
          <div className="container-tags-img">
            <a className="w-100 h-100" target="_blank" href={routes.adCenter}>
              <Image
                alt="logo-title"
                src="/202211211134193442015.jpg"
                width="438"
                height="400"
              />
            </a>
            <div class="gg-tips-text-svideo">廣告</div>
          </div>
        </div>
        <div>
          <TabsListPage></TabsListPage>
        </div>
        <div>
          <ListPageRow cidValue={cidValue} />
        </div>
      </Suspense>
    </MainLayout>
  );
}
