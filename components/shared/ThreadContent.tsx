"use client";

import LinkPreview from "./LinkPreview";

export default function ThreadContent({ content }: { content: string }) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const renderText = (text: string) => {
    return text.split(urlRegex).map((part, i) =>
      /^https?:\/\//.test(part) ? (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline break-all"
          onClick={(e) => e.stopPropagation()}
        >
          {part}
        </a>
      ) : (
        <span key={i}>
          {part.split("\n").map((line, j, arr) => (
            <span key={j}>
              {line}
              {j < arr.length - 1 && <br />}
            </span>
          ))}
        </span>
      )
    );
  };

  return (
    <>
      <p className="mt-2 text-small-regular text-light-2 whitespace-pre-wrap">
        {renderText(content)}
      </p>
      {/https?:\/\/[^\s]+/.test(content) && (
        <LinkPreview url={content.match(/https?:\/\/[^\s]+/)![0]} />
      )}
    </>
  );
}