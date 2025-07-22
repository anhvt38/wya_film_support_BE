import MainLayout from "@/layouts/MainLayout";

import "./styles.scss";
import {
  TagsListPage,
  TagsSmallVideoListPage,
} from "@/components/tags-small-video-list-page";
import { TagsAllPreferencesListPage } from "@/components/tags-all-preferences-list-page";
import Image from "next/image";
import { TagsRecommendListPage } from "@/components/tags-recommend-list-page";
import { TagsAllClassesListPage } from "@/components/tags-all-classes-list-page";
import { TagsFullTariffListPage } from "@/components/tags-full-tariff-list-page";
// import { TabsListPage } from "@/components/svideo/[orderBy]";
// import { ActressVideoRow } from "@/components/actress-video-row";
import { ListPageRow } from "@/components/list-page-row";
// import { TabsListPage } from "./svideo/[orderBy]/page";
import { TabsListPage } from "@/components/tabs-list-page";
import { Pagination } from "@/components/pagination";
import { Suspense } from "react";

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

export default function ListPage({}) {
  // const router = useParams();

  // let { orderBy } = router;
  // orderBy = Number(orderBy);
  // const recordcount = window.localStorage.getItem(
  //   "recordcount"
  // );

  const cidValue = 'svideo';

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
          <Image
            alt="logo-title"
            src="/202211211134193442015.jpg"
            width="438"
            height="400"
          />
        </div>
      </div>
      <div>
        <TabsListPage></TabsListPage>
      </div>
      <div>
        <ListPageRow cidValue={cidValue} />
      </div>
      {/* <Pagination total={3200} page={1} pageSize={36} /> */}
      </Suspense>
    </MainLayout>
  );
}
