import { FiDelete, FiFile } from "react-icons/fi";

interface MediaFilesRendererI {
  medias: any[];
  onRemoveMediaFile?: (any) => any;
}

export default function MediaFilesRenderer({
  medias,
  onRemoveMediaFile = (id) => {},
}: MediaFilesRendererI) {
  if (medias?.length === 0 || !Array.isArray(medias)) return null;

  return (
    <div className="w-full">
      <div className="flex flex-wrap -mr-2">
        {medias?.map((m) => {
          const { _id, url, mimeType, title } = m;
          return (
            <a
              href={url}
              target="_blank"
              rel="no-follow"
              className="w-1/3 pr-2 mb-2 relative block"
              key={_id}
            >
              <div className="flex items-center rounded bg-white border hover:border-primary-600 p-2">
                <FiDelete
                  size={17}
                  className="block absolute right-0 mr-3 top-0 mt-2 bg-white"
                  onClick={(e) => {
                    e.preventDefault();
                    onRemoveMediaFile(_id);
                  }}
                />
                <FiFile size={30} className="flex-shrink-0 text-gray-400" />
                <div className="ml-2 flex flex-col text-xs flex-1 overflow-hidden">
                  <span className="font-semibold text-gray-700">{title}</span>
                  <span className="">{mimeType}</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
