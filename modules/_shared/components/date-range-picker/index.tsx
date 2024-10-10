import React, { Fragment, useState, useEffect, forwardRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Button } from "@startupsquare/ds";
import { DateRangePicker as ReactDateRangePicker } from "react-date-range";
import { RiCalendar2Line } from "react-icons/ri";
import formatDate, { formatDateNoYear } from "@/lib/format-date";
import { usePopper } from "react-popper";
import getYear from "date-fns/getYear";
import {
  sub,
  isToday,
  isYesterday,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  addMonths,
  isSameDay,
} from "date-fns";

type RangeObjectType = {
  startDate: Date;
  endDate: Date;
};

type DateRangePickerTypeProps =
  | {
      type?: "range";
      range: RangeObjectType;
    }
  | { type?: "date" | "defined-range" };

type DateRangePickerCallbackProps = {
  onChange?: (any) => any;
  onCancel?: (any) => any;
};

type DateRangePickerProps = DateRangePickerTypeProps &
  DateRangePickerCallbackProps &
  Record<string, any>;

const startOfThisWeek = startOfWeek(new Date());
const endOfThisWeek = endOfWeek(new Date());
const startOfThisMonth = startOfMonth(new Date());
const endOfThisMonth = endOfMonth(new Date());
const startOfLastWeek = startOfWeek(addDays(new Date(), -7));
const endOfLastWeek = endOfWeek(addDays(new Date(), -7));
const startOfLastMonth = startOfMonth(addMonths(new Date(), -1));
const endOfLastMonth = endOfMonth(addMonths(new Date(), -1));

function getCurrentPickerButtonValue(type, range) {
  let valueText = "";
  if (type === "range") {
    const startDate = range?.startDate,
      endDate = range?.endDate;
    if (startDate && endDate) {
      if (getYear(startDate) === getYear(endDate)) {
        if (
          isSameDay(startOfThisMonth, startDate) &&
          isSameDay(endOfThisMonth, endDate)
        ) {
          valueText = `This month`;
        } else if (
          isSameDay(startOfLastMonth, startDate) &&
          isSameDay(endOfLastMonth, endDate)
        ) {
          valueText = `Last month`;
        } else if (
          isSameDay(startOfThisWeek, startDate) &&
          isSameDay(endOfThisWeek, endDate)
        ) {
          valueText = `This week`;
        } else if (
          isSameDay(startOfLastWeek, startDate) &&
          isSameDay(endOfLastWeek, endDate)
        ) {
          valueText = `Last week`;
        } else if (isToday(startDate)) {
          valueText = `Today`;
        } else if (isYesterday(startDate)) {
          valueText = `Yesterday`;
        } else {
          valueText = `${formatDateNoYear(startDate)} - ${formatDate(endDate)}`;
        }
      } else {
        valueText = `${formatDate(startDate)} - ${formatDate(endDate)}`;
      }
    }
  }
  return valueText || "Select a date range";
}

const defaultRange: RangeObjectType = {
  startDate: sub(new Date(), {
    weeks: 1,
  }),
  endDate: new Date(),
};

export default function DateRangePicker({
  type = "range",
  range = defaultRange,
  onChange = () => {},
  onCancel = () => {},
  DatePickerComponent = null,
  ...otherProps
}: DateRangePickerProps) {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "auto",
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <Popover.Button as={"div"} ref={setReferenceElement}>
            {DatePickerComponent ? (
              <div className="" ref={setReferenceElement}>
                <DatePickerComponent
                  date={getCurrentPickerButtonValue(type, range)}
                />
              </div>
            ) : (
              <div
                ref={setReferenceElement}
                className="text-sm text-blue-gray-500 flex items-center cursor-pointer px-3 py-1.5 border rounded bg-white shadow-sm hover:text-primary-600 hover:border-primary-600/[.5]"
              >
                <RiCalendar2Line size={15} className="mr-2" />
                <span className="">
                  {getCurrentPickerButtonValue(type, range)}
                </span>
              </div>
            )}
          </Popover.Button>
          <Popover.Panel
            // @ts-ignore
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className="z-[100]"
          >
            <div
              ref={setArrowElement}
              className="hidden -mt-3"
              style={{
                ...styles.arrow,
                width: 21,
                height: 21,
                background: `url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMSIgaGVpZ2h0PSI5Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiM4ODk4QUEiIGZpbGwtb3BhY2l0eT0iLjEiIGQ9Ik0xIDkuMDkyaDE5bC02LjQwMi02Ljc0Yy0xLjcxNy0xLjgwNi00LjQ4NS0xLjgtNi4xOTYgMEwxIDkuMDkzek0yMC4zNDIgOGwtNi4wMi02LjMzNmMtMi4xMDgtMi4yMi01LjUzOC0yLjIxOC03LjY0NSAwTC42NTggOGgxOS42ODR6Ii8+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTcuNDAyIDIuMzUzYzEuNzExLTEuODAxIDQuNDgtMS44MDcgNi4xOTYgMEwyMCA5LjA5M0gxbDYuNDAyLTYuNzR6Ii8+PC9nPjwvc3ZnPg==)`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "50%",
              }}
            ></div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              {type === "range" && (
                <RangePicker
                  onChange={onChange}
                  onCancel={onCancel}
                  closePopover={close}
                  range={range}
                  {...otherProps}
                />
              )}
            </Transition>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}

type RangePickerProps = {
  closePopover: () => any;
  onChange: (any) => any;
  onCancel: (any) => any;
  range: RangeObjectType;
};

const RangePicker = forwardRef<HTMLDivElement, RangePickerProps>(
  ({ closePopover, onChange, onCancel, range, ...otherProps }, ref) => {
    const [localDateRange, setLocalDateRange] = useState(range);
    useEffect(() => {
      setLocalDateRange(range);
    }, [range]);
    return (
      <div
        ref={ref}
        className="flex flex-col overflow-hidden bg-white border rounded-md shadow-xl"
      >
        <ReactDateRangePicker
          onChange={(data) => {
            setLocalDateRange(data.selection);
          }}
          ranges={[{ ...localDateRange, key: "selection" }]}
          {...otherProps}
        />
        <div className="flex space-x-0 justify-end bg-blue-gray-50 border-t px-1 py-1.5">
          <Popover.Button
            as={Button}
            size="small"
            intent="dark"
            style="ghost"
            onClick={onCancel}
          >
            Cancel
          </Popover.Button>
          <Button
            // as={Button}
            size="small"
            intent="primary"
            style="ghost"
            onClick={(e) => {
              e?.preventDefault();
              onChange({
                startDate: localDateRange.startDate,
                endDate: localDateRange.endDate,
              });
              closePopover();
            }}
          >
            Select Range
          </Button>
        </div>
      </div>
    );
  }
);
