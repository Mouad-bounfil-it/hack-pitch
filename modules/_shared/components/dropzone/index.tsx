import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uid } from "uid";
import API from "@/router/index";

export default function Dropzone(props) {
  const { trigger: uploadFiles, isMutating: isUploading } =
    API.profile.medias.useUploadFiles();

  const onDrop = useCallback(async (acceptedFiles) => {
    // Do something with the files
    try {
      for (let i = 0; i < acceptedFiles.length; i++) {
        acceptedFiles[i].uniqueName = `file_${Date.now()}_${
          acceptedFiles[i].name
        }`;
        acceptedFiles[i]._id = uid(10);
      }

      try {
        const response = await uploadFiles({
          files: acceptedFiles,
        });

        const files = response?.data;
      } catch (e) {}

      debugger;
    } catch (error) {
      debugger;
    }
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const files = acceptedFiles.map((file, i) => {
    return (
      <li key={i}>
        {/* @ts-ignore */}
        {file.path} - {file.size} bytes
      </li>
    );
  });

  return (
    <section className="border border-dashed border-blue-gray-400 rounded p-6 bg-blue-gray-50 h-32">
      <div
        {...getRootProps({
          className:
            "text-center text-xs uppercase font-medium cursor-pointer hover:text-primary-600 focus:outline-none",
        })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {false && files?.length > 0 ? (
        <aside className="text-sm mt-6">
          <h4 className="text-primary-600">Files:</h4>
          <ul>{files}</ul>
        </aside>
      ) : null}
    </section>
  );
}
