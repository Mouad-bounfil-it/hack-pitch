import showdown from "showdown";
import DOMPurify from "dompurify";
import cn from "classnames";
import { TypographyStylesProvider } from "@mantine/core";

interface MarkdownRendererPropsI {
  content?: string;
  className?: string;
}

export default function MarkdownRenderer({
  content,
  className = null,
}: MarkdownRendererPropsI) {
  const converter = new showdown.Converter();
  const _content = converter.makeHtml(content);

  return (
    <TypographyStylesProvider>
      <div
        className={cn(className, "w-full max-w-full")}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(_content, {
            ADD_TAGS: ["iframe"],
            ADD_ATTR: ["allow", "allowfullscreen", "target"],
          }),
        }}
      />
    </TypographyStylesProvider>
  );
}
