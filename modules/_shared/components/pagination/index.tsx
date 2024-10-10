import { ActionIcon, Button } from "@mantine/core";
import { Skeleton } from "@startupsquare/ds";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default function Pagination({
  isLoading = false,
  limit,
  total,
  page,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onNextPage = () => {},
  onPreviousPage = () => {},
  scrollToTop = true,
}) {
  const _limit = limit > total ? total : limit;
  return (
    <div className="flex items-center justify-between">
      <p className="hidden text-sm text-blue-gray-600 lg:block">
        Showing
        <span className="mx-1 font-medium">
          {isLoading ? <Skeleton width={20} /> : _limit}
        </span>
        of the
        <span className="mx-1 font-medium">
          {isLoading ? <Skeleton width={20} /> : total}
        </span>
        results
      </p>
      <p className="block text-sm lg:hidden text-blue-gray-600">
        {isLoading ? (
          <Skeleton width={20} />
        ) : (
          <>
            <span className="font-medium">{_limit}</span>
            <span className="mx-1">of</span>
            <span className="font-medium">{total}</span>
          </>
        )}
      </p>
      <div className="flex items-center space-x-3">
        <p className="text-sm text-blue-gray-600">
          Page
          <span className="mx-1 font-medium">
            {isLoading ? <Skeleton width={20} /> : page}
          </span>
          of
          <span className="mx-1 font-medium">
            {isLoading ? <Skeleton width={20} /> : totalPages}
          </span>
        </p>
        <div className="flex items-center space-x-2 md:hidden">
          <ActionIcon
            variant="filled"
            color=""
            disabled={!hasPreviousPage || isLoading}
            onClick={(e) => {
              e.preventDefault();
              onPreviousPage();
              window.scrollTo(0, 0);
            }}
          >
            <BsArrowLeft size={18} />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            color=""
            disabled={!hasNextPage || isLoading}
            onClick={(e) => {
              e.preventDefault();
              onNextPage();
              window.scrollTo(0, 0);
            }}
          >
            <BsArrowRight size={18} />
          </ActionIcon>
        </div>
        <div className="items-center hidden space-x-2 md:flex">
          <Button
            size="sm"
            disabled={!hasPreviousPage || isLoading}
            leftIcon={<BsArrowLeft size={18} />}
            onClick={(e) => {
              e.preventDefault();
              onPreviousPage();
              if (scrollToTop) {
                window.scrollTo(0, 0);
              }
            }}
          >
            Previous
          </Button>
          <Button
            size="sm"
            disabled={!hasNextPage || isLoading}
            rightIcon={<BsArrowRight size={18} />}
            onClick={(e) => {
              e.preventDefault();
              onNextPage();
              if (scrollToTop) {
                window.scrollTo(0, 0);
              }
            }}
          >
            Next Page
          </Button>
        </div>
      </div>
    </div>
  );
}
