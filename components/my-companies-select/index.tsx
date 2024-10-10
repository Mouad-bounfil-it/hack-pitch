import API from "@/router/index";
import { CompanyAbilityTypes } from "@/types/ability-types";
import { Select } from "@mantine/core";
import type { SelectProps } from "@mantine/core";

type MyOrganizationsSelectT = {
  permission?: CompanyAbilityTypes;
  style?: "default";
} & Omit<SelectProps, "data">;

import { Avatar, Group, Text } from "@mantine/core";
import { forwardRef } from "react";
import { BiRocket } from "react-icons/bi";

export default function MyCompaniesSelect(props: MyOrganizationsSelectT) {
  const { profile, companies } = API.v3.profile.useFindCurrentProfile();

  const { permission, style, ...selectProps } = props;

  return (
    <Select
      data={companies
        ?.filter((o) => {
          if (permission) {
            const currentComp = profile.companies?.[o._id];
            return !!currentComp?.abilities?.[permission];
          }
          return true;
        })
        .map((cmps) => {
          return {
            logo: cmps?.logo,
            label: cmps?.givenName,
            value: cmps?._id,
            description: cmps?.shortDescription?.en || "",
          };
        })}
      itemComponent={DefaultItem}
      icon={<BiRocket size={14} />}
      maxDropdownHeight={200}
      nothingFound="No companies found"
      placeholder="Select company"
      filter={(value, item) =>
        item?.label?.toLowerCase()?.includes(value?.toLowerCase()?.trim()) ||
        item?.description.toLowerCase().includes(value?.toLowerCase()?.trim())
      }
      {...selectProps}
    />
  );
}

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  logo: string;
  label: string;
}

const DefaultItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ logo, label, ...others }: ItemProps, ref) => {
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          <div className="shrink-0">
            <Avatar size={"sm"} src={logo}>
              <BiRocket size={18} />
            </Avatar>
          </div>
          <div>
            <Text size="sm" className="line-clamp-1">
              {label}
            </Text>
          </div>
        </Group>
      </div>
    );
  }
);
