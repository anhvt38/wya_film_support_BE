import {
  captchaCallback,
  checkValidEmail,
  getHeaderMainMenus,
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

  if (type == 'previewVideo') {
    const upstreamRes = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*",
      },
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
