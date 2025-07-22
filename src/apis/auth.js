
import { apiRequestAnygate } from '@/utils/request/request-anygate';
import qs from 'qs';

export const checkEmailIsValid = async (body) => {
    return apiRequestAnygate(`/Register/IsValidEmail`, 'POST', body);
}

export const receiveCaptchaCallback = async (body) => {
    return apiRequestAnygate(`/Auth/ReceiveCaptchaCallback`, 'POST', body);
}



