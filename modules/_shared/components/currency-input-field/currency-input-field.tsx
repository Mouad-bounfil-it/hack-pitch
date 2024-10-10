import React, { memo } from "react";
import { forwardRef } from "./forward-ref";
import cn from "classnames";
import Select, { components } from "react-select";
import CURRENCIES from "./currencies.json";

import { Components as SharedComponents } from "@/modules/_shared";
export interface CurrencyInputFieldProps {
  size?: "small" | "medium" | "large";
  shape?: "rectangle" | "rounded" | "circle";
  type?: string;
  className?: string;
  inputClassName?: string;
  selectClassName?: string;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isSearchableSelect?: boolean;
  isClearableSelect?: boolean;
  value: string;
  currency: any;
  onChangeCurrency?: (currency: string) => void;
}

const sizeClassnamesMap = {
  small: "text-xs px-2 py-2",
  medium: "text-sm px-3 py-2.5",
  large: "text-base px-3 py-3.5",
};

const shapeClassnamesMap = {
  small: "rounded-sm",
  medium: "rounded",
  large: "rounded-md",
};

const { Option } = components;
const IconOption = (props) => {
  const curr = props?.value?.toLowerCase();
  return (
    <Option {...props} className="flex items-center">
      <div className="flex items-center space-x-2">
        <div className={`mr-2 currency-flag currency-flag-${curr}`}></div>
        <p>{props?.data?.value}</p>
      </div>
    </Option>
  );
};

export const CurrencyInputField = forwardRef<
  CurrencyInputFieldProps,
  React.ElementType
>(
  (
    {
      size = "medium",
      shape = "rounded",
      type = "number",
      className,
      inputClassName,
      selectClassName,
      value,
      currency,
      isSearchableSelect = true,
      isClearableSelect = false,
      isDisabled,
      isFullWidth,
      onChangeCurrency = (value) => {},
      ...otherProps
    }: CurrencyInputFieldProps,
    ref
  ) => {
    const classNames = cn(
      className,
      "relative flex items-center text-blue-gray-600 placeholder-blue-gray-400 shadow-sm border border-blue-gray-200",
      isDisabled && "bg-blue-gray-100",
      // sizeClassnamesMap[size],
      shape === "circle"
        ? "rounded-full"
        : shape === "rectangle"
        ? "rounded-none"
        : shapeClassnamesMap[size],
      isFullWidth && "w-full",
      "focus-within:border-blue-600"
    );
    const inputCls = cn(
      inputClassName,
      "w-full border-transparent",
      "focus:ring-0 focus:border-transparent",
      sizeClassnamesMap[size],
      shape === "circle"
        ? "rounded-full"
        : shape === "rectangle"
        ? "rounded-none"
        : shapeClassnamesMap[size]
    );
    const selectCls = cn(
      selectClassName,
      "focus:ring-0 focus:border-transparent"
    );
    let currencyValue = currency
      ? {
          label: CURRENCIES?.find((curr) => curr?.value === currency)?.label,
          value: currency,
        }
      : null;

    return (
      <div className={classNames}>
        <input
          ref={ref}
          type={type}
          className={inputCls}
          disabled={isDisabled}
          value={value}
          {...otherProps}
        />
        <Select
          styles={{
            control: (base, state) => ({
              ...base,
              border: state.isFocused ? 0 : 0,
              // This line disable the blue border
              boxShadow: state.isFocused ? 0 : 0,
              "&:hover": {
                border: state.isFocused ? 0 : 0,
              },
              indicatorSeparator: () => ({}),
              indicatorsContainer: () => ({}),
            }),
          }}
          className={cn(
            "w-1/3 border-l text-sm focus:border-transparent",
            selectCls
          )}
          value={currencyValue}
          onChange={(res) => {
            if (Array.isArray(res as string[])) {
              onChangeCurrency(res.map((o) => o.value));
              return;
            }
            if (res) {
              onChangeCurrency(res.value);
            } else {
              onChangeCurrency("");
            }
          }}
          isDisabled={isDisabled}
          isClearable={isClearableSelect}
          isSearchable={isSearchableSelect}
          name="Currency"
          options={CURRENCIES}
          defaultValue={CURRENCIES[0]}
          components={{ Option: IconOption }}
          getOptionLabel={(e) => {
            const curr = e.value?.toLowerCase();
            return (
              <div className="flex items-center">
                {/* <div
                  style={{ width: "20px", height: "12px" }}
                  className={`mr-2 currency-flag  currency-flag-${curr}`}
                ></div> */}
                <span className="text-sm">{e.value}</span>
              </div>
            );
          }}
        />
      </div>
    );
  }
);

export default memo(CurrencyInputField);
