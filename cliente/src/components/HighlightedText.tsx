import { HTMLAttributes } from "react";

export const HighlightedText = ({
  text,
  color,
  highlight,
  ...rest
}: HTMLAttributes<HTMLParagraphElement> & {
  text: string;
  highlight?: string;
  color?: string;
}) => {
  if (!highlight) {
    return <p {...rest}>{text}</p>;
  }

  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <p {...rest}>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} className={color ? color : "bg-white/40"}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </p>
  );
};
