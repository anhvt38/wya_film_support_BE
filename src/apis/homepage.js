
import { apiRequest } from '@/utils/request/request';
import { apiRequestAdc } from '@/utils/request/request-adc';
import { apiRequestApi8 } from '@/utils/request/request-api8';
import requestAuth from '@/utils/request/request-auth';
import { apiRequestMupload } from '@/utils/request/request-mupload';
import { apiRequestRankv21 } from '@/utils/request/request-rankv21';
import { apiRequestWaAnygate } from '@/utils/request/request-wa-anygate';
import qs from 'qs';
import { signQuery } from "@/utils/common";
import { apiRequestAnygateVip } from '@/utils/request/request-api-anygate';

const ARR_PRIVATES = ["version001", "vers1on001", "vers1on00i", "bersion001", "vcrsion001", "versi0n001", "versio_001", "version0o1"];

export const getAllHotVideoTop = async (params) => {
    const query = qs.stringify(params);
    return apiRequestRankv21(`/api/list/getAllHotVideoTop?${query}`);
}

export const getAllHotAlbums = async (params) => {
    const query = qs.stringify(params);
    return apiRequestApi8(`/v3/album/GetHotAlbums?${query}`);
}

export const getAdultLiveList = async (params) => {
    const query = qs.stringify(params);
    return apiRequestMupload(`/api/user/GetAdultLiveList?${query}`);
}

export const getNewHotVideoGroup = async (query) => {
    return apiRequestMupload(`/api/home/getnewhotvideogroup?${query}`);
}

export const getListSearch = async (query, cid, tag) => {
  return apiRequestMupload(`/api/list/Search?${query}`);
}

export const getListSearchAPI8 = async (query, cid, tag) => {
//   let query = qs.stringify(params);
//   query = query.replace("&desc=1", `&desc=1&cid=${cid}`);  
//   const excluded = [null, undefined, ''];

//   if (!excluded.includes(tag) ){
//   query = query.replace("&isserial", `&label=${tag}&isserial`);

//   }
  return apiRequestApi8(`/api/list/Search?${query}`);
}

export const getStarList = async (query) => {
    return apiRequestApi8(`/api/list/starlist?${query}`);
}

export const getMainMenus = async (query) => {
    return apiRequestApi8(`/v3/list/mainMenus?${query}`);
}

export const getAllVideo = async (query) => {
    return apiRequestApi8(`/v3/home/getAllVideo?${query}`);
}

export const getVideoRank = async (query) => {
    // const query = qs.stringify(params);
    return apiRequestRankv21(`/api/list/GetVideoRank?${query}`);
}

export const getAllVideoMupload = async (query) => {
    return apiRequestMupload(`/api/home/getAllVideo?${query}`);
}

export const getAllInOneType = async (query) => {
    return apiRequestApi8(`/api/list/allinonetype?${query}`);
}

export const getTagFilter = async (query) => {
    return apiRequestApi8(`/api/video/GetTagFilter?${query}`);
}

export const getHelpContentById = async (params) => {
  const query = qs.stringify(params);
  return apiRequestApi8(`/api/home/gethelpcontentbyid?${query}`);
}

export const GetAllLabels = async (params, body) => {
    const query = qs.stringify(params);
    const formdata = new FormData();
    formdata.append("vv", body.vv);
    formdata.append("pub", body.pub);
    return apiRequestApi8(`/v3/album/GetAllLabels?${query}`, 'POST', formdata);
}

export const getAlbumFlowList = async (query, pageParam) => {
    return apiRequestApi8(`/v3/album/GetAlbumFlowList?${query}&page=${pageParam}`);
}

export const getHelpCatList = async (query) => {
    // const query = qs.stringify(params);
    return apiRequestApi8(`/api/home/gethelpcat?${query}`);
}

export const getAllPositionPrice = async (params) => {
    const query = qs.stringify(params);
    return apiRequestAdc(`/price/GetAllPositionPrice?${query}`);
}

export const getAdprice = async (params) => {
    const query = qs.stringify(params);
    return apiRequestAdc(`/price/getadprice?${query}`);
}

export const getReportInfo = async (query) => {
    // const query = qs.stringify(params);
    return apiRequestApi8(`/api/home/GetReportInfo?${query}`);
}

export const getHelpContentList = async (query) => {
    // const query = qs.stringify(params);
    return apiRequestApi8(`/api/home/gethelpcontent?${query}`);
}

export const getHelpContentListById = async (query) => {
    // const query = qs.stringify(params);
    return apiRequestApi8(`/api/home/gethelpcontentbyid?${query}`);
}

export const getLabels = async (query) => {
    // const query = qs.stringify(params);
    return apiRequestApi8(`/v3/album/getlabels?${query}`);
}

export const getSubLabels = async (query) => {
    // const query = qs.stringify(params);
    return apiRequestApi8(`/v3/album/GetSubLabels?${query}`);
}

export const getAlbumLabelList = async (query) => {
    // const query = qs.stringify(params);
    return apiRequestApi8(`/v3/album/GetAlbumLabelList?${query}`);
}

export const getAttensionList = async (params, body) => {
    const query = qs.stringify(params);
    return apiRequestApi8(`/v3/user/GetAttensionList?${query}`, 'POST', body);
}

export const getPaymentInfo = async (params) => {
    const query = qs.stringify(params);
    return apiRequestApi8(`/api/payment/getPaymentInfo?${query}`);
}

// export const getUserInfo = async (query) => {
//     return apiRequestAnygateVip(`/api/user/GetUserInfo?${query}`);
// }


export const getObtainListWithCount = async (body, params) => {
    const query = qs.stringify(params);
    return apiRequestWaAnygate(`/v3/PlayList/ObtainListWithCount?${query}`, 'POST', body);
}

export const getHomeConfig = async (params) => {
    let query = qs.stringify(params);
    let pub = new Date().getTime();
    const indexGet = pub % ARR_PRIVATES.length;
    console.log('indexGet ', indexGet);
    
    let privateKey = ARR_PRIVATES[indexGet];
    query = signQuery(query, pub, privateKey);
    return apiRequestApi8(`/v3/home/config?${query}`);
}



// const newUser = await apiRequest('https://api.example.com/users', 'POST', {
//     name: 'Alice',
//     age: 25,
//   });

// await apiRequest('https://api.example.com/users/123', 'DELETE', null, {
//     Authorization: 'Bearer your-token',
//   });

// export const getCompanyDetail = async (id, params) => {
//     const query = qs.stringify(params);
//     return requestAuth.get(`companies/${id}?${query}`);
// }

// export const createCompany = async (body) => {
//     return request.post(`companies`, body);
// }

// export const updateCompany = async (id, body) => {
//     return requestAuth.put(`companies/${id}`, body);
// }
