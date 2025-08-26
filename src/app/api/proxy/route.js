import {
  captchaCallback,
  checkValidEmail,
  getHeaderMainMenus,
  getUserInfo,
  sendCodeToEmail,
} from './proxy-helpers';

export const runtime = 'nodejs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url') || "";
  const type = searchParams.get('type') || 'header';

  let data;

    switch (type) {
    case 'header':
      data = await getHeaderMainMenus();
      break;
  }

  if (type == 'getUserInfor') {
    data = await getUserInfo(url);
  }

  if (type == 'previewVideo') {
    const upstreamRes = await fetch(url, {
      // headers: {
      //   "User-Agent": "Mozilla/5.0",
      //   "Accept": "*/*",
      // },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json,text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      }
    });

    const text = await upstreamRes.text();

    // 🔁 Rewrite các URL .ts để đi qua proxy
    const baseUrl = url.split("/").slice(0, -1).join("/");
    const proxied = text.replace(/(.*\.ts(\?.*)?)/g, (match) => {
      let fullUrl = `${match}`;

      if (!/^https?:\/\//i.test(match)) {
        fullUrl = `${baseUrl}/${match}`;
      }
      return `/api/segment?url=${encodeURIComponent(fullUrl)}`;
    });

    return new Response(proxied, {
      headers: {
        "Content-Type": "application/vnd.apple.mpegurl",
      },
    });
  }

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}


export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url') || "";
  const type = searchParams.get('type') || 'checkEmail';

  let data;

    if (type == 'checkEmail') {
      data = await checkValidEmail(request.body)
    } else if (type == 'sendCode') {
      data = await sendCodeToEmail(request.body)
    } else if (type == 'captchaCallback') {
      data = await captchaCallback(request.body)
    }
    

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
