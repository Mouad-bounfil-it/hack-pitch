import React, { memo } from "react";
import Select from "react-select";

import COUNTRIES from "./countries.json";

interface CountriesSearchSelectPropsI {}

const CountriesSearchSelect = ({
  value,
  onChange = (name) => {},
  isDisabled = false,
  isMulti = false,
}) => {
  let _value = value
    ? {
        label: value,
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

  return (
    <Select
      className="shadow-sm text-sm"
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
      isClearable={true}
      isSearchable={true}
      name="country"
      options={COUNTRIES}
    />
  );
};

export default memo(CountriesSearchSelect);
