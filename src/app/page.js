import MainLayout from "@/layouts/MainLayout";
import Home from "./home";

import "./styles.scss";

export const metadata = {
    title: '午夜AV-免费成人视频分享网站',
    description: `午夜AV-免费成人视频分享网站`,
    openGraph: {
      title: '午夜AV-免费成人视频分享网站',
      description: `午夜AV-免费成人视频分享网站`,
    },
    openGraph: {
      // images: `${process.env.NEXTAUTH_URL}/images/banner1.jpeg`,
    },
  }

export default async function HomePage() {
    return (
        <MainLayout>
          <Home  />
        </MainLayout>
    );
}