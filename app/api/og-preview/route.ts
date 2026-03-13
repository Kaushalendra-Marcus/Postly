import { NextRequest, NextResponse } from "next/server";

const BLOCKED_DOMAINS = [
  "pornhub.com", "xvideos.com", "xnxx.com", "xhamster.com",
  "redtube.com", "youporn.com", "tube8.com", "spankbang.com",
  "porntrex.com", "beeg.com", "tnaflix.com", "drtuber.com",
  "4tube.com", "fuq.com", "txxx.com", "hclips.com",
  "onlyfans.com", "fansly.com", "chaturbate.com", "livejasmin.com",
];

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({}, { status: 400 });

  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    if (BLOCKED_DOMAINS.some((d) => hostname === d || hostname.endsWith(`.${d}`))) {
      return NextResponse.json({}, { status: 403 });
    }
  } catch {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PostlyBot/1.0)",
      },
      next: { revalidate: 3600 },
    });

    const html = await res.text();

    const getMeta = (property: string) => {
      const match =
        html.match(new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']+)["']`, "i")) ||
        html.match(new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*property=["']${property}["']`, "i"));
      return match?.[1] || "";
    };

    const getMetaName = (name: string) => {
      const match =
        html.match(new RegExp(`<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']+)["']`, "i")) ||
        html.match(new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*name=["']${name}["']`, "i"));
      return match?.[1] || "";
    };

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);

    const data = {
      title: getMeta("og:title") || getMetaName("twitter:title") || titleMatch?.[1] || "",
      description: getMeta("og:description") || getMetaName("description") || getMetaName("twitter:description") || "",
      image: getMeta("og:image") || getMetaName("twitter:image") || "",
      url: getMeta("og:url") || url,
    };

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({}, { status: 500 });
  }
}