import React, { memo } from "react";
import Select, { components } from "react-select";

import CURRENCIES from "./currencies.json";

interface CurrenciesSearchSelectPropsI {}

const CurrenciesSearchSelect = ({
  value,
  onChange = (name) => {},
  isDisabled = false,
  isMulti = false,
  isClearable = false,
  isSearchable = true,
  styles = {},
  isIconOption = false,
}) => {
  let _value = value
    ? {
        label: CURRENCIES.find((currency) => currency.value === value).label,
        value: value,
      }
    : null;

  if (isMulti) {
    // @ts-ignore
    _value = Array.isArray(value)
      ? value.map((label) => ({
          label,
          value: label,
        }))
      : [];
  }

  const { Option } = components;
  const IconOption = (props) => (
    <Option {...props} className="flex items-center">
      <div className="flex items-center space-x-2">
        <div
          className={`mr-2 currency-flag currency-flag-${props?.value?.toLowerCase()}`}
        ></div>
        <p>{props?.data?.value}</p>
      </div>
    </Option>
  );

  if (isIconOption) {
    return (
      <Select
        styles={{ ...styles }}
        className="w-full text-sm"
        isMulti={isMulti}
        value={_value}
        onChange={(res) => {
          if (isMulti && Array.isArray(res)) {
            onChange(res.map((o) => o.value));
            return;
          }

          if (res) {
            onChange(res.value);
          } else {
            onChange("");
          }
        }}
        isDisabled={isDisabled}
        isClearable={isClearable}
        isSearchable={isSearchable}
        name="Currency"
        options={CURRENCIES}
        defaultValue={CURRENCIES[0]}
        components={{ Option: IconOption }}
        getOptionLabel={(e) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              className={`mr-2 currency-flag currency-flag-${e.value?.toLowerCase()}`}
            ></div>
            <span style={{ marginLeft: 5 }}>{e.value}</span>
          </div>
        )}
      />
    );
  }

  return (
    <Select
      styles={{ ...styles }}
      className="w-full text-sm shadow-sm"
      isMulti={isMulti}
      value={_value}
      onChange={(res) => {
        if (isMulti && Array.isArray(res)) {
          onChange(res.map((o) => o.value));
          return;
        }

        if (res) {
          onChange(res.value);
        } else {
          onChange("");
        }
      }}
      isDisabled={isDisabled}
      isClearable={isClearable}
      isSearchable={isSearchable}
      name="Currency"
      options={CURRENCIES}
    />
  );
};

export default memo(CurrenciesSearchSelect);
