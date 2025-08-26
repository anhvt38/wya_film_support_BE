
import { apiRequest } from '@/utils/request/request';
import { apiRequestApi8 } from '@/utils/request/request-api8';
import requestAuth from '@/utils/request/request-auth';
import { apiRequestMupload } from '@/utils/request/request-mupload';
import { apiRequestRankv21 } from '@/utils/request/request-rankv21';
import qs from 'qs';

export const getVideoDetail = async (query) => {
    return apiRequestMupload(`/api/video/play?${query}`);
}

export const getVideoDetailType2 = async (query) => {
    return apiRequestApi8(`/v3/video/play?${query}`);
}

export const getRelatedVideo = async (query) => {
    return apiRequestRankv21(`/api/home/getRelativeVideo?${query}`);
}

export const getVideoTrend = async (query) => {
    return apiRequestRankv21(`/api/list/getVideoTrend?${query}`);
}

export const getInfoVideoDetail = async (query) => {
    return apiRequestApi8(`/v3/video/detail?${query}`);
}

export const getTrends = async (body, params) => {
    const query = qs.stringify(params);
    return apiRequestApi8(`/v3/trends/GetTrends?${query}`, 'POST', body);
}

export const getListTrends = async (body, params, pageParam) => {
    const query = qs.stringify(params);
    return apiRequestApi8(`/v3/trends/GetListTrends?${query}`, 'POST', {
        ...body,
        page: pageParam
    });
}

export const getUserViewModel = async (query) => {
    return apiRequestApi8(`/v3/video/GetUserViewModel?${query}`);
}

export const getVideoPie = async (query) => {
    return apiRequestRankv21(`/api/list/getVideoPie?${query}`);
}


export const getLanguagesPlayList = async (query) => {
    return apiRequestApi8(`/v3/video/languagesplaylist?${query}`);
}


