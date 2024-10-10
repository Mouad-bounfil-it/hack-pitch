import { Calendar, dateFnsLocalizer } from "@react-next-calendar/core";
import { startOfWeek, format, parse, getDay, isSameDay } from "date-fns";
import cn from "classnames";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
import "@react-next-calendar/core/dist/styles.css";
import { BiLoaderAlt } from "react-icons/bi";
import { Button } from "@startupsquare/ds";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const COLORS_MENU = [
  {
    colorHex: "#3B82F6",
    color: "blue-500",
    bgColor: "!bg-blue-500",
  },
  {
    colorHex: "#EF4444",
    color: "red-500",
    bgColor: "!bg-red-500",
  },
  {
    colorHex: "#F59E0B",
    color: "yellow-500",
    bgColor: "!bg-yellow-500",
  },
  {
    colorHex: "#10B981",
    color: "green-500",
    bgColor: "!bg-green-500",
  },
  {
    colorHex: "#6366F1",
    color: "indigo-500",
    bgColor: "!bg-indigo-500",
  },
  {
    colorHex: "#EC4899",
    color: "pink-500",
    bgColor: "!bg-pink-500",
  },
  {
    colorHex: "#6b7280",
    color: "gray-500",
    bgColor: "!bg-gray-500",
  },
  {
    colorHex: "#8B5CF6",
    color: "purple-500",
    bgColor: "!bg-purple-500",
  },
];

export default function FullPageCalendar({
  events = [],
  loading = false,
  onRangeChange = (range, view) => {},
  onSelectEvent = (event, e) => {},
  customToolbarChildren = null,
  defaultView = "month",
  ...props
}) {
  return (
    <div className="relative">
      {loading && (
        <div className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <div className="animate-spin text-blue-gray-400">
            <BiLoaderAlt size={40} />
          </div>
        </div>
      )}
      <Calendar
        elementProps={{
          className: `h-screen${
            loading ? " animate-pulse" : ""
          } transform duration-500`,
        }}
        localizer={dateFnsLocalizer({
          format,
          //@ts-ignore
          parse,
          startOfWeek,
          getDay,
          locales,
        })}
        events={events}
        eventPropGetter={(event, start, end, isSelected) => {
          const OneDayEvent = isSameDay(
            new Date(event?.dateInfos?.start),
            new Date(event?.dateInfos?.end)
          );

          if (event?.type === "EVENT_INTERACTION" || OneDayEvent) {
            return {
              className:
                "!text-blue-gray-700 text-xs !bg-white hover:bg-blue-gray-50",
            };
          }

          const eventColor = COLORS_MENU?.find(
            (c) => c?.colorHex === event?.eventColor
          );

          const eventBgColor =
            eventColor && eventColor?.colorHex
              ? eventColor?.bgColor
              : "!bg-blue-500";

          return {
            className: `text-white text-xs ${eventBgColor}`,
          };
        }}
        popup={true}
        startAccessor={(event) => {
          return new Date(event?.dateInfos?.start);
        }}
        endAccessor={(event) => {
          return new Date(event?.dateInfos?.end);
        }}
        defaultView={defaultView}
        views={["month", "week", "day"]}
        onRangeChange={onRangeChange}
        onSelectEvent={onSelectEvent}
        showMultiDayTimes={false}
        components={{
          toolbar: ({
            label,
            date,
            onNavigate,
            onView,
            view,
            views,
            ...props
          }) => {
            return (
              <CustomToolbar
                label={label}
                date={date}
                view={view}
                views={views}
                customToolbarChildren={customToolbarChildren}
                onNavigate={onNavigate}
                onView={onView}
              />
            );
          },
          week: { event: MyWeekEvent },
          month: { event: MyMonthEvent },
          day: { event: MyDayEvent },
        }}
        tooltipAccessor={(event) => {
          return `Name: ${event?.givenName}${
            event?.parentProgram?.givenName
              ? "\nProgram: " + event?.parentProgram?.givenName
              : ""
          }\nTime: ${format(
            new Date(event?.dateInfos?.start),
            "hh:mm aaa"
          )} - ${format(
            new Date(event?.dateInfos?.end),
            "hh:mm aaa"
          )}\nOrganization: ${event?.organization?.givenName}\nType: ${
            event?.type === "EVENT_INTERACTION"
              ? "Meeting"
              : event?.isProgram
              ? "Program"
              : "Event"
          }`;
        }}
        {...props}
      />
    </div>
  );
}

function MyWeekEvent({ event }) {
  const OneDayEvent = isSameDay(
    new Date(event?.dateInfos?.start),
    new Date(event?.dateInfos?.end)
  );

  return (
    <div className="flex flex-col space-y-1 overflow-hidden whitespace-nowrap">
      <span className="font-medium">
        {event?.parentProgram?.givenName
          ? `${event?.parentProgram?.givenName} > `
          : ""}
        {event?.givenName}
      </span>
      {OneDayEvent && (
        <span>
          {`${format(
            new Date(event?.dateInfos?.start),
            "hh:mm aaa"
          )} - ${format(new Date(event?.dateInfos?.end), "hh:mm aaa")}`}
        </span>
      )}
    </div>
  );
}

function MyMonthEvent({ event }) {
  const OneDayEvent = isSameDay(
    new Date(event?.dateInfos?.start),
    new Date(event?.dateInfos?.end)
  );

  return (
    <div className="flex items-center overflow-hidden whitespace-nowrap">
      {OneDayEvent && (
        <>
          <div className="items-center flex-none mr-1">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
          </div>
          <span className="mr-1">
            {`${format(new Date(event?.dateInfos?.start), "hh:mmaaa")}`}
          </span>
        </>
      )}
      <span className="py-0.5 font-medium">
        {event?.parentProgram?.givenName
          ? `${event?.parentProgram?.givenName} > `
          : ""}
        {event?.givenName}
      </span>
    </div>
  );
}

function MyDayEvent({ event }) {
  const startDate =
    `${format(new Date(event?.dateInfos?.start), "hh:mm aaa")}` || "";
  return (
    <div className="flex flex-col space-y-1 overflow-hidden whitespace-nowrap">
      <span className="font-medium">
        {event?.parentProgram?.givenName
          ? `${event?.parentProgram?.givenName} > `
          : ""}
        {`${event?.givenName}, ${startDate}`}
      </span>
    </div>
  );
}

function CustomToolbar({
  label,
  date,
  view,
  views,
  customToolbarChildren = null,
  onNavigate = (_) => {},
  onView = (_) => {},
}) {
  // useEffect(() => {
  //   console.log("filters rendred");
  // }, []);
  const dateFormat = view === "day" ? "EEEE dd, MMMM yyyy" : "MMMM yyyy";
  const navigation = { PREVIOUS: "PREV", NEXT: "NEXT", TODAY: "TODAY" };
  return (
    <div className="flex flex-col justify-between gap-2 p-2 opacity-100 sm:px-3 sm:py-4 sm:items-center sm:flex-row">
      <span className="flex items-center space-x-2">
        <span className="flex items-center space-x-2">
          <Button
            style="outline"
            intent="secondary"
            shape="rounded"
            type="button"
            size="small"
            className="!rounded-md !border-blue-gray-300"
            onClick={() => onNavigate(navigation.TODAY)}
          >
            Today
          </Button>
          <Button
            style="soft"
            intent="secondary"
            shape="circle"
            type="button"
            size="small"
            className="!px-1.5 !py-1.5"
            onClick={() => onNavigate(navigation.PREVIOUS)}
          >
            <FiChevronLeft size={16} />
          </Button>
          <Button
            style="soft"
            intent="secondary"
            shape="circle"
            type="button"
            size="small"
            className="!px-1.5 !py-1.5"
            onClick={() => onNavigate(navigation.NEXT)}
          >
            <FiChevronRight size={16} />
          </Button>
        </span>

        <span className="font-medium text-md text-blue-gray-600 ">
          {format(new Date(date), dateFormat)}
        </span>
      </span>

      <div className="flex space-x-2">
        <SegmentedControl
          data={views?.map((v) => {
            return {
              value: v,
              label: v,
            };
          })}
          value={view}
          onChange={onView}
        />
        {customToolbarChildren}
      </div>
    </div>
  );
}

function SegmentedControl({
  data = [],
  value: _value,
  onChange = (_) => {},
  isDisabled = false,
  isHidden = false,
}) {
  if (!data || data?.length === 0 || isHidden) return null;
  return (
    <div
      className={cn(
        "flex justify-center p-0.5 bg-blue-gray-100 border border-blue-gray-100 rounded-md space-x-1",
        { "opacity-70": isDisabled }
      )}
    >
      {data?.map(({ value, label }, i) => (
        <a
          key={i}
          href="#switch-calendar-view"
          className={cn(
            "py-1.5 px-4 focus:outline-none text-xs capitalize font-medium rounded-md",
            {
              "cursor-not-allowed": isDisabled,
              "text-blue-gray-500 hover:bg-white hover:bg-opacity-60 transform duration-300":
                isDisabled || value !== _value,
              "text-primary-600 bg-white shadow-sm":
                !isDisabled && value === _value,
            }
          )}
          onClick={(e) => {
            e.preventDefault();
            if (!isDisabled) {
              onChange(value);
            }
          }}
        >
          {label}
        </a>
      ))}
    </div>
  );
}
