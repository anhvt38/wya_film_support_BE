const HOST_API = process.env.HOST_API;
const HOST_API_ACCOUNT_ANYGATE = process.env.HOST_API_ACCOUNT_ANYGATE;
const HOST_API_ANYGATE_VIP = process.env.HOST_API_ANYGATE_VIP;

export const getHeaderMainMenus = async () => {
  const res = await fetch(`${HOST_API}/assets/menu/mainmenu_fix_0_2.json?v=5`);
  return await res.json();
};

export const getUserInfo = async (query) => {
  const res = await fetch(`${HOST_API_ANYGATE_VIP}/api/user/GetUserInfo?${query}`);
  return await res.json();
};

export const getStreamUrl = async (url) => {
    const res = await fetch(url)
  return res;
};

export const checkValidEmail = async (body) => {
  const res = await fetch(`${HOST_API_ACCOUNT_ANYGATE}/Register/IsValidEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  return await res.json();
};

export const sendCodeToEmail = async (body) => {
  const res = await fetch(`${HOST_API_ACCOUNT_ANYGATE}/Register/MakeAuthCode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  return await res.json();
};

export const captchaCallback = async (body) => {
  const res = await fetch(`${HOST_API_ACCOUNT_ANYGATE}/Auth/ReceiveCaptchaCallback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  return await res.json();
};
