import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uid } from "uid";
import { Button } from "@startupsquare/ds";
import { FiUploadCloud } from "react-icons/fi";
import cn from "classnames";
import API from "@/router/index";

// "image/*"
export default function FilePicker({
  cdnPath = `platfrom-v2/_files`,
  isMulti = false,
  onFilesUploaded = (files) => {},
  onFileUploadStarted = () => {},
  accept = null,
  maxFiles = 0,
  buttonTitle = "",
  isIcon = false,
  renderCustomComponent = null,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const { trigger: uploadFiles, isMutating: isUploading } =
    API.profile.medias.useUploadFiles();

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    // Do something with the files
    try {
      setIsLoading(true);
      onFileUploadStarted();
      for (let i = 0; i < acceptedFiles.length; i++) {
        acceptedFiles[i].uniqueName = `file_${Date.now()}_${
          acceptedFiles[i].name
        }`;
        acceptedFiles[i]._id = uid(10);
      }

      try {
        const resp = await uploadFiles({
          files: isMulti ? acceptedFiles : [acceptedFiles[0]],
          cdnPath,
        });
        const files = resp?.data;
        if (files && files?.length) {
          onFilesUploaded(files);
        }
      } catch (error) {
        onFilesUploaded(null);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      onFilesUploaded(null);
    }
  };

  const { acceptedFiles, getRootProps, getInputProps, inputRef } = useDropzone({
    onDrop,
    onDropRejected: (rejections) => {
      alert("File types not supported or you selected too many!");
    },
    maxFiles,
    multiple: isMulti,
    ...(accept ? { accept } : {}),
  });

  const ref = useRef();
  if (renderCustomComponent) {
    return renderCustomComponent(isLoading, ref, getRootProps, getInputProps);
  }
  return (
    <div className="w-full" {...getRootProps()}>
      <Button
        onClick={(e) => {
          e.preventDefault();
        }}
        leftIcon={<FiUploadCloud size={16} />}
        isFullWidth
        intent="white"
        style="outline"
        isLoading={isLoading}
        ref={ref}
        className={cn({
          "cursor-pointer relative block opacity-0 w-full h-full p-4 z-50":
            isIcon,
        })}
      >
        <input {...getInputProps()} />
        {buttonTitle ? buttonTitle : "Choose File"}
      </Button>
    </div>
  );
}
