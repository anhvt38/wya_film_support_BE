"use client"

import { CListGroup, CListGroupItem } from "@coreui/react";
import Link from "next/link";
import "./styles.scss";
import { CommonVideoRow } from "../common-video-row";
import Image from "next/image";
import { FaFireFlameCurved } from "react-icons/fa6";
import { getFlagSrcByModelCountry } from "@/utils/common";

export const LivestreamVideoItem = (props) => {
  const { item, children } = props || {};
  const { title, liveURL, snapshotUrl, streamUrl, userName, previewUrlThumbSmall, viewersCount, clickUrl, modelsCountry } = item || {};



  return (

    <div className="livestream-video-item">
      <Link href={clickUrl}>
        <div className="position-relative overflow-hidden">
          <p className="position-absolute livestream-item-title d-flex gap-1 align-items-center justify-content-start w-full top-0 px-2 mb-2 pt-3 truncate-one-line">
            <Image
              alt='live-ic'
              src="/wy-live.png"
              width={30}
              height={15}
            />
            {title}
          </p>
          <Image
            alt=''
            src={snapshotUrl}
            width={0}
            height={245}
            sizes="100vw"
            className="w-full video-item-thumbnail"
          />
          <div className="view-time d-flex justify-content-between align-items-center  position-absolute bottom-0 px-2 pb-2 pt-3 w-full">

            <div className=" d-flex justify-content-start gap-2 align-items-end ">
              <div className="livestream-avatar">
                <Image
                  alt={'avatar'}
                  src={previewUrlThumbSmall}
                  width={35}
                  height={35}
                  className="rounded-full"
                />
                <div className="livestream-dot"></div>
              </div>
              <p>{userName}</p>
            </div>
            {!!getFlagSrcByModelCountry(modelsCountry) &&
              <div className="text-white">
                <Image
                  alt={modelsCountry}
                  src={getFlagSrcByModelCountry(modelsCountry)}
                  width={30}
                  height={20}
                />
              </div>
            }

          </div>
        </div>
      </Link>
    </div>
  )
}
