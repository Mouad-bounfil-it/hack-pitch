import { forwardRef } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

import { Button } from "@startupsquare/ds";
import { RiCalendar2Line } from "react-icons/ri";

// For more props definitions:
// https://github.com/Hacker0x01/react-datepicker/blob/main/docs/datepicker.md
interface DateTimePickerI extends ReactDatePickerProps {
  value: any;
  onChange: (date) => any;
  renderCustomPicker?: any;
}

export default function DateTimePicker({
  value,
  onChange = (date) => {},
  renderCustomPicker = null,
  ...props
}: DateTimePickerI) {
  const CustomPicker = forwardRef(
    // @ts-ignore
    ({ value, onClick }, ref) => {
      if (renderCustomPicker) {
        return renderCustomPicker(value, onClick, ref);
      }
      return (
        <Button
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
          ref={ref}
          leftIcon={<RiCalendar2Line size={16} />}
          isFullWidth
          intent="white"
          style="outline"
        >
          {value || "Select a date"}
        </Button>
      );
    }
  );

  return (
    <DatePicker
      selected={value ? new Date(value) : null}
      onChange={(date) => onChange(date)}
      customInput={<CustomPicker />}
      showYearDropdown
      timeIntervals={5}
      {...props}
    />
  );
}
