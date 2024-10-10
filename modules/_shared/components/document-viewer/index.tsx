import { CSSProperties } from "react";

import DocViewer, {
  DocViewerRenderers,
  IDocument,
  IConfig,
  ITheme,
} from "react-doc-viewer";

interface DocumentViewerPropsI {
  documents: IDocument[];
  config?: IConfig;
  className?: string;
  style?: CSSProperties;
  theme?: ITheme;
}

export default function DocumentViewer({
  documents = [],
  className = "",
  style = {},
  config = {},
  theme = {},
}: DocumentViewerPropsI) {
  if (documents?.length === 0) {
    return <p>NO DOCUMENTS PROVIDED</p>;
  }
  const _config = {
    header: { disableFileName: true, disableHeader: true },
    ...config,
  };

  return (
    <DocViewer
      documents={documents}
      pluginRenderers={DocViewerRenderers}
      className={className}
      style={style}
      config={_config}
      theme={theme}
    />
  );
}
