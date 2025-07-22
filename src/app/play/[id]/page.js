import VideoDetail from "@/app/watch/content";
import MainLayout from "@/layouts/MainLayout";
import { Suspense } from "react";

export const metadata = {
    title: 'Video detail',
    description: `Video detail`,
  }

export default function PlayVideoDetailPage({params}) {

    return (
        <MainLayout>
            <Suspense>
                <VideoDetail paramId={params.id} watchRoute={false} />
            </Suspense>
        </MainLayout>
    );
}