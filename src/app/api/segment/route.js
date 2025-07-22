export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  if (!url) return new Response("Missing url", { status: 400 });

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  return new Response(res.body, {
    status: res.status,
    headers: {
      "Content-Type": "video/MP2T",
    },
  });
}
