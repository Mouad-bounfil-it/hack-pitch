import { pick } from "lodash";

export default function getPaginationMeta(object) {
  return pick(object, [
    "totalDocs",
    "limit",
    "totalPages",
    "page",
    "hasPrevPage",
    "hasNextPage",
    "nextPage",
    "prevPage",
  ]);
}
