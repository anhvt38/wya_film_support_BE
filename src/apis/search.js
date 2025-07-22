import request from '@/utils/request/request';
import { apiRequestApi8 } from '@/utils/request/request-api8';
import requestAuth from '@/utils/request/request-auth';
import { apiRequestMupload } from '@/utils/request/request-mupload';
import { apiRequestRankv21 } from '@/utils/request/request-rankv21';
import qs from 'qs';

export const getHotSearchList = async (params) => {
    const query = qs.stringify(params);
    return apiRequestRankv21(`/v3/list/gethotsearchlist?${query}`);
}

export const getBriefSearch = async (body, params) => {
    const query = qs.stringify(params);
    return apiRequestRankv21(`/v3/list/briefsearch?${query}`, 'POST', body);
}

export const getSearchUser = async (body, params, headers) => {
    const query = qs.stringify(params);
    return apiRequestRankv21(`/v3/list/searchUser?${query}`, 'POST', body, {...headers});
}

export const getLabels = async (params) => {
    const query = qs.stringify(params);
    return apiRequestApi8(`/v3/album/getlabels?${query}`);
}

export const getSearchAlbum = async (body, params) => {
    const query = qs.stringify(params);
    return apiRequestApi8(`/v3/album/SearchAlbum?${query}`, 'POST', body);
}

