"use client";

import LinkPreview from "./LinkPreview";

export default function ThreadContent({ content }: { content: string }) {
  return (
    <>
      <p className="mt-2 text-small-regular text-light-2">
        {content.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
          /^https?:\/\//.test(part) ? (
            <a key={i} href={part} target="_blank" rel="noopener noreferrer"
              className="text-blue-400 hover:underline break-all"
              onClick={(e) => e.stopPropagation()}>
              {part}
            </a>
          ) : <span key={i}>{part}</span>
        )}
      </p>
      {/https?:\/\/[^\s]+/.test(content) && (
        <LinkPreview url={content.match(/https?:\/\/[^\s]+/)![0]} />
      )}
    </>
  );
}