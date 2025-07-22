import MainLayout from "@/layouts/MainLayout";

import "./styles.scss";
import Search from "./content";

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

  return (
    <MainLayout>
      <Search />
    </MainLayout>
  );
}
