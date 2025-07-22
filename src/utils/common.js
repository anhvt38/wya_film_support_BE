import { BUSINESS_GROUP, BUSINESS_KEYS } from "@/contants/variables";
import { FaChair } from "react-icons/fa";
import { MdMeetingRoom, MdTableRestaurant } from "react-icons/md";
import _ from "lodash-es";
import qs from 'qs';
import { IoFemale, IoMale, IoMaleFemaleOutline } from "react-icons/io5";

export const textColorByOrder = (index) => {
  let color = '';
  switch (index) {
    case 0:
      return color = 'text-orange';
    case 1:
      return color = 'text-orange-light';
    case 2:
      return color = 'text-yellow';
    default:
      return color = 'text-secondary';

  }
  return color;
}

export const getFlagSrcByModelCountry = (modelsCountry = '') => {
  let flatCountry = "";
  switch (modelsCountry) {
    case "jp":
      flatCountry = "/flag_countries/JP.png";
      break;
    case "cn":
      flatCountry = "/flag_countries/cn.svg";
      break;
    case "tw":
      flatCountry = "/flag_countries/tw.svg";
      break;
    case "au":
      flatCountry = "/flag_countries/AU.png";
      break;
    case "ca":
      flatCountry = "/flag_countries/CA.png";
      break;
    case "de":
      flatCountry = "/flag_countries/DE.png";
      break;
    case "es":
      flatCountry = "/flag_countries/ES.png";
      break;
    case "fr":
      flatCountry = "/flag_countries/FR.png";
      break;
    case "gl":
      flatCountry = "/flag_countries/GL.png";
      break;
    case "it":
      flatCountry = "/flag_countries/IT.png";
      break;
    case "kr":
      flatCountry = "/flag_countries/KR.png";
      break;
    case "my":
      flatCountry = "/flag_countries/MY.png";
      break;
    case "nz":
      flatCountry = "/flag_countries/NZ.png";
      break;
    case "sg":
      flatCountry = "/flag_countries/SG.png";
      break;
    case "uk":
      flatCountry = "/flag_countries/UK.png";
      break;
    case "us":
      flatCountry = "/flag_countries/US.png";
      break;
    default:
      flatCountry = "";
      break;
  }

  return flatCountry;
}

export const convertHotView = (view) => {
  let viewConvert = view > 10000 ? `${(view / 10000).toFixed(1)} 万` : view;
  return viewConvert;
}

export const getMediaPlaylistUrl = async (masterUrl, preferredRes = '720x960') => {
  const res = await fetch(masterUrl);
  const text = await res.text();
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`RESOLUTION=${preferredRes}`)) {
      return lines[i + 1].startsWith('http')
        ? lines[i + 1]
        : new URL(lines[i + 1], masterUrl).toString();
    }
  }

  // fallback: lấy dòng đầu tiên có STREAM-INF
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('#EXT-X-STREAM-INF')) {
      return lines[i + 1].startsWith('http')
        ? lines[i + 1]
        : new URL(lines[i + 1], masterUrl).toString();
    }
  }

  return null; // not found
};

export const ensureHttps = url => {
  url = url ?? ""
  return url
    ? url.startsWith('https:') ? url : 'https:' + url
    : ""
};

export const pushParamToURl = (oldObj, newObj) => {
  const formatObj = _.pickBy({
    ...oldObj,
    ...newObj
  }, _.identity);

  const link = qs.stringify(formatObj, { encode: false });

  return `?${link}`
}

export const highlightKeywordInText = (text, keyword) => {
  const parts = text.split(new RegExp(`(${keyword})`, "g"));
  return parts.map((part, i) =>
    part === keyword ? (
      <span key={i} className="text-pink">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export const getImgSrcByUserLevel = (level) => {

  let src = '';
  switch (level) {
    case 1:
      src = `/level/lv_1.png`;
      break;
    case 2:
      src = `/level/lv_2.png`;
      break;
    case 3:
      src = `/level/lv_3.png`;
      break;
    case 4:
      src = `/level/lv_4.png`;
      break;
    case 5:
      src = `/level/lv_5.png`;
      break;
    case 6:
      src = `/level/lv_6.png`;
      break;

    default:
      break;
  }

  return src;

}

export const getSexIcon = (num) => {
  if (num == 0) {
    return <IoFemale className="text-bold-pink" />
  } else {
    return <IoMale className="text-blue" />
  }
}