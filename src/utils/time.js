import { DDMM_FORMAT, DDMMYYYY_FORMAT, YYYY_MM_DD_FORMAT } from "@/contants/format";
import { TIME_RANGE_SELECT, TIME_RANGE_SELECT_OVERVIEW } from "@/contants/time";
import dayjs from "dayjs";
import _ from "lodash-es";
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

export const formatVideoDuration = (timeStr) => {
    const [hour, minute, second] = timeStr.split(":");
  
    if (hour === "00") {
      return `${minute}:${second}`;
    } else {
      return `${hour}:${minute}:${second}`;
    }
  }
