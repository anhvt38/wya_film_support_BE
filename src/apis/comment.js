
import { apiRequest } from '@/utils/request/request';
import { apiRequestApi8 } from '@/utils/request/request-api8';
import requestAuth from '@/utils/request/request-auth';
import { apiRequestMupload } from '@/utils/request/request-mupload';
import { apiRequestRankv21 } from '@/utils/request/request-rankv21';
import qs from 'qs';

export const getCommentList = async (params) => {
    const query = qs.stringify(params);
    return apiRequestApi8(`/v3/video/commentList?${query}`);
}

