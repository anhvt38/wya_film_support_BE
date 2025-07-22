
export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const onlyNumberRegExp = /^[\d.]+$/;

export const languages = [
    {
      src: "/flag_countries/DE.png",
      text: "德国",
      key: 'de'
    }
  ]

  export const VIEWPORT_RATIOS = [
    {
        value: "auto",
        label: "Mặc định"
    },
    {
        value: "4/3",
        label: "4:3"
    },
    {
        value: "16/9",
        label: "16:9"
    },
]

export const SEX = {
  FEMALE: {
    value: "FEMALE",
    label: "女性"
  },
  MALE: {
    value: "MALE",
    label: "男性"
  }
}

export const MAIN_TYPES = {
  video: "",
  star: "star",
  album: "album",
  user: "user",
  activity: "activity"
}

export const DEFAULT_CID = {
  svideo: "svideo",
    japanCid: `0,2,10,85`,
   europeCid: `0,2,10,86`,
   cartoonCid: `0,2,10,88`,
   domesticCid: `0,2,10,87`,
}