import dynamic from "next/dynamic";
import { QuillPropsI } from "./wysiwyg-editor";
const DocumentViewer = dynamic(() => import("./document-viewer"), {
  ssr: false,
});
const WysiwygEditor = dynamic(() => import("./wysiwyg-editor"), {
  ssr: false,
}) as unknown as (props: QuillPropsI) => JSX.Element;

export { default as NProgress } from "./nprogress";
export { default as Pagination } from "./pagination";
export { default as DropdownMenu } from "./dropdown-menu";
export { default as EntityCover } from "./entity-cover";
export { default as Redirect } from "./redirect";
export { default as Alert } from "./alert";
export { default as AlertDialog } from "./alert-dialog";
export { default as Modal } from "./modal";
export { default as Tabs } from "./tabs";
export { default as SidePanel } from "./side-panel";
export { default as SearchModal } from "./search-modal";
// export { default as WysiwygEditor } from "./wysiwyg-editor";
export { WysiwygEditor };
export { default as CountriesSearchSelect } from "./countries-search-select";
export { default as InputFileUpload } from "./input-file-upload";
export { default as DateTimePicker } from "./date-time-picker";
export { default as Dropzone } from "./dropzone";
export { default as FilePicker } from "./file-picker";
export { default as MarkdownRenderer } from "./markdown-renderer";
export { default as Calendar } from "./full-page-calendar";
export { default as CurrenciesSearchSelect } from "./currencies-search-select";
export { default as DateRangePicker } from "./date-range-picker";
export { DocumentViewer };
export { default as PagePanel } from "./page-panel";
export { default as MediaItemCard } from "./media-item-card";
export { default as ChoiseChips } from "./choice-chips";
export { default as RingProgress } from "./ring-progress";
export { default as PopoverMenu } from "./popover-menu";
export { default as Breadcrumb } from "./breadcrumb";
export { default as SearchBar } from "./search-bar";
export { default as MediaFilesRenderer } from "./media-files-renderer";
export { default as CurrencyInputField } from "./currency-input-field";
export { default as RedirectComponent } from "./redirect-v2";
export { default as Tooltip } from "./tooltip";
