import React, { CSSProperties, useCallback, useRef } from "react";
import { uid } from "uid";
import { RichTextEditor, RichTextEditorProps } from "@mantine/rte";

import { ToolbarControl } from "@mantine/rte/lib/components/Toolbar/controls";

import API from "@/router/index";

export interface QuillPropsI extends RichTextEditorProps {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  toolbarMode?: "partial" | "full";
  toolbar?: [];
  onChange?: (content: string, delta: any, source: any, editor: any) => void;
  style?: CSSProperties;
  className?: string;
}

const toolbarModes: Record<"partial" | "full", ToolbarControl[][]> = {
  partial: [
    ["bold", "italic", "underline", "strike", "clean"],
    ["h1", "h2", "h3", "h4"],
    ["unorderedList", "orderedList"],
    ["alignLeft", "alignCenter", "alignRight"],
  ],
  full: [
    ["bold", "italic", "underline", "strike", "clean"],
    ["h1", "h2", "h3", "h4"],
    ["unorderedList", "orderedList"],
    ["image", "video", "link", "codeBlock"],
    ["alignLeft", "alignCenter", "alignRight"],
    ["sup", "sub"],
  ],
};

export default function QuillEditor({
  placeholder = "",
  defaultValue = "",
  value = "",
  toolbar: _toolbar,
  toolbarMode = "partial",
  onChange = (realContent, delta, source, editor) => {},
  style = null,
  className = "",
  ...editorProps
}: QuillPropsI) {
  const editorRef = useRef<HTMLDivElement>();

  const { trigger: uploadFiles, isMutating: isUploading } =
    API.profile.medias.useUploadFiles();

  const _controls = toolbarMode
    ? toolbarModes[toolbarMode]
    : toolbarModes["full"];

  const handleImageUpload = useCallback(
    (file): Promise<string> =>
      new Promise(async (resolve, reject) => {
        file.uniqueName = `file_${Date.now()}_${file.name}`;
        file._id = uid(10);

        try {
          const resp = await uploadFiles({
            files: [file],
          });

          const uploadedFile = resp?.data;
          if (uploadedFile && uploadedFile[0] && uploadedFile[0].url) {
            const url = uploadedFile[0].url;
            resolve(url);
          }
        } catch (error) {
          reject("No file selected");
        }
      }),
    []
  );

  const classNames = `${className} relative flex flex-col w-full
    max-w-full bg-white border
    rounded shadow-sm !border-slate-300
    focus:ring-0 focus:border-blue-600 !text-base`;

  return (
    <div className="relative w-full" ref={editorRef}>
      <RichTextEditor
        {...editorProps}
        id="rte"
        sticky={editorProps?.sticky || false}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onImageUpload={handleImageUpload}
        className={classNames}
        controls={_controls}
        style={style}
      />
    </div>
  );
}
