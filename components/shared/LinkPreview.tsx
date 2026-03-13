"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface OGData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

interface Props {
  url: string;
}

export default function LinkPreview({ url }: Props) {
  const [og, setOg] = useState<OGData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOG = async () => {
      try {
        const res = await fetch(`/api/og-preview?url=${encodeURIComponent(url)}`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setOg(data);
      } catch {
        setOg(null);
      } finally {
        setLoading(false);
      }
    };
    fetchOG();
  }, [url]);

  if (loading) {
    return (
      <div className="mt-3 rounded-xl border border-dark-4 p-3 animate-pulse">
        <div className="h-3 bg-dark-4 rounded w-3/4 mb-2" />
        <div className="h-3 bg-dark-4 rounded w-1/2" />
      </div>
    );
  }

  if (!og?.title) return null;

  const domain = new URL(url).hostname.replace("www.", "");

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 block rounded-xl border border-dark-4 overflow-hidden hover:border-gray-1 transition-colors"
    >
      {og.image && (
        <div className="relative w-full h-[200px]">
          <Image
            src={og.image}
            alt={og.title ?? "Link preview"}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}
      <div className="p-3 bg-dark-3">
        <p className="text-[11px] text-gray-1 mb-1">{domain}</p>
        <p className="text-small-semibold text-light-1 line-clamp-1">{og.title}</p>
        {og.description && (
          <p className="text-[12px] text-gray-1 line-clamp-2 mt-1">{og.description}</p>
        )}
      </div>
    </a>
  );
}