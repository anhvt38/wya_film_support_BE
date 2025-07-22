import MainLayout from "@/layouts/MainLayout";
import VideoDetail from "./content";
import { Suspense } from "react";

export const metadata = {
    title: 'Video detail',
    description: `Video detail`,
  }

export default function VideoDetailPage() {

    return (
        <MainLayout>
            <Suspense>
                <VideoDetail />
            </Suspense>
        </MainLayout>
    );
}