import cn from "classnames";
import { Badge, Button } from "@startupsquare/ds";
import ReactPlayer from "react-player";
import {
  AiOutlineDownload,
  AiOutlineFilePdf,
  AiOutlineFilePpt,
  AiOutlineFileZip,
} from "react-icons/ai";
import { RiDriveLine, RiFileExcel2Line } from "react-icons/ri";
import { FiExternalLink } from "react-icons/fi";
import { FcDocument, FcFile } from "react-icons/fc";
import { Components as SharedComponents } from "@/modules/_shared";

const MEDIAS_TYPES = [
  {
    type: "zip",
    mimeTypes: ["application/zip", "application/x-zip-compressed"],
    Icon: AiOutlineFileZip,
  },
  {
    type: "pdf",
    mimeTypes: [
      "application/acrobat",
      "application/pdf",
      "application/x-pdf",
      "text/pdf",
      "text/x-pdf",
    ],
    Icon: AiOutlineFilePdf,
  },
  {
    type: "excel",
    mimeTypes: [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
      "	application/vnd.ms-excel",
      "application/vnd.ms-excel.sheet.macroEnabled.12",
      "text/csv",
      "application/csv",
    ],
    Icon: RiFileExcel2Line,
  },
  {
    type: "powerpoint",
    mimeTypes: [
      "application/vnd.ms-powerpoint.template.macroEnabled.12",
      "application/vnd.openxmlformats-officedocument.presentationml.template",
      "application/vnd.ms-powerpoint.addin.macroEnabled.12",
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
      "application/vnd.ms-powerpoint",
    ],
    Icon: AiOutlineFilePpt,
  },
  {
    type: "document",
    mimeTypes: [
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    Icon: FcDocument,
  },
  {
    type: "drive",
    Icon: RiDriveLine,
  },
];

export default function MediaItemCard({ media, mediaDefaultState }) {
  const merged = { ...mediaDefaultState, ...media };

  const { title, description, url, mimeType } = merged;
  let descriptionEn = "";
  let type = "";

  if (typeof description === "object" && description !== null) {
    descriptionEn = description?.en;
    type = merged?.type ? merged?.type : "General";
  } else {
    descriptionEn = description;
  }

  return (
    <div className="flex flex-col justify-end p-4 space-y-3 overflow-hidden bg-white border rounded shadow-sm border-blue-gray-200 hover:shadow-lg">
      <MediaImage media={media} />
      <div className="flex flex-col space-y-2 capitalize divide-y">
        <div className="flex flex-col w-full pb-3 space-y-2 min-h-32">
          {type && (
            <span className="text-sm capitalize text-blue-gray-400 line-clamp-1">
              {type}
            </span>
          )}
          <p className="font-medium line-clamp-1">{title}</p>
          {descriptionEn ? (
            <p
              className="mb-8 text-sm text-blue-gray-400 line-clamp-3"
              style={{ minHeight: 40 }}
            >
              <SharedComponents.MarkdownRenderer
                content={descriptionEn}
                className="text-sm"
              />
            </p>
          ) : (
            <p
              className="mb-8 text-sm text-bule-gray-500"
              style={{ minHeight: 40 }}
            >
              No short description added.
            </p>
          )}
        </div>
        <div className="flex items-center justify-between pt-4">
          <MediaMimeType media={media} />
          <Button
            intent="secondary"
            size="small"
            style="soft"
            leftIcon={
              mimeType === "link" ? (
                <FiExternalLink />
              ) : (
                <AiOutlineDownload size={14} />
              )
            }
            onClick={(e) => {
              e.preventDefault();
              if (mimeType == "link") {
                window.open(url, "_blank");
                return;
              }
              downloadMedia(url, title);
            }}
          >
            {mimeType === "link" ? "Open" : "Download"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function downloadMedia(url, filename) {
  const link = document.createElement("a");

  link.setAttribute("href", url);
  link.setAttribute("target", "_blank");
  link.setAttribute("download", filename);
  link.click();
}

const getMediaType = (media) => {
  if (media?.url?.includes("drive")) {
    return "drive";
  }
  if (media?.url?.includes(".zip")) {
    return "zip";
  }
  if (media?.url?.includes("youtu.be") || media?.url?.includes("youtube.com")) {
    return "video";
  }

  const extension = media?.url.substring(media?.url.lastIndexOf("."));
  if (extension) {
    if (
      [
        ".bmp",
        ".jpg",
        ".gif",
        ".jpeg",
        ".png",
        ".tiff",
        ".webp",
        ".svg+xml",
      ].includes(extension?.toLowerCase())
    ) {
      return "image";
    }
  }
  return null;
};

const MediaMimeType = ({ media }) => {
  const _media = MEDIAS_TYPES.find(({ mimeTypes }) => {
    return mimeTypes?.includes(media?.mimeType);
  });

  const mediaType = _media ? _media?.type : getMediaType(media);

  return (
    <span className="text-xs text-blue-gray-500 line-clamp-1">
      <Badge
        size="small"
        shape="rounded"
        color={
          mediaType === "pdf"
            ? "red"
            : mediaType === "excel"
            ? "green"
            : mediaType === "powerpoint"
            ? "yellow"
            : mediaType === "drive"
            ? "green"
            : mediaType === "video"
            ? "red"
            : mediaType === "image"
            ? "yellow"
            : mediaType === "document"
            ? "blue"
            : "gray"
        }
        style="soft"
        className="line-clamp-1"
      >
        {mediaType ? mediaType : "file"}
      </Badge>
    </span>
  );
};

const MediaImage = ({ media }) => {
  const _media = MEDIAS_TYPES.find(({ mimeTypes }) => {
    return mimeTypes?.includes(media?.mimeType);
  });

  let IconByType;
  if (media?.mimeType === "link") {
    IconByType = media?.url?.includes("drive")
      ? RiDriveLine
      : media?.url?.includes(".zip")
      ? AiOutlineFileZip
      : FcFile;
  } else {
    IconByType = _media ? _media?.Icon : FcFile;
  }

  const mediaType = _media ? _media?.type : getMediaType(media);

  return (
    <>
      {mediaType === "image" ? (
        <div className="-mx-6 -mt-6 border-b bg-blue-gray-50 h-52">
          <img
            className="object-cover w-full h-full"
            alt="profile cover"
            src={media?.url}
          />
        </div>
      ) : mediaType === "video" ? (
        <div className="-mx-6 -mt-6 border-b bg-blue-gray-50 h-52">
          <ReactPlayer
            controls={true}
            url={media?.url}
            width="100%"
            height="100%"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center -mx-6 -mt-6 border-b bg-blue-gray-50 h-52">
          <IconByType
            className={cn({
              "text-red-800": mediaType === "pdf",
              "text-green-700": mediaType === "excel",
              "text-indigo-600": mediaType === "zip",
              "text-yellow-400": mediaType === "powerpoint",
              "text-green-500": mediaType === "drive",
              "text-primary-600": mediaType === "document",
            })}
            size={80}
          />
        </div>
      )}
    </>
  );
};
