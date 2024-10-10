import API from "@/router/index";
import { OrganizationAbilityTypes } from "@/types/ability-types";
import { Select } from "@mantine/core";
import type { SelectProps } from "@mantine/core";

type MyOrganizationsSelectT = {
  permission?: OrganizationAbilityTypes;
  style?: "default";
} & Omit<SelectProps, "data">;

import { Avatar, Group, Text } from "@mantine/core";
import { forwardRef } from "react";
import { RiBuilding2Line, RiBuilding4Line } from "react-icons/ri";

export default function MyOrganizationsSelect(props: MyOrganizationsSelectT) {
  const { profile, organizations } = API.v3.profile.useFindCurrentProfile();

  const { permission, style, ...selectProps } = props;

  return (
    <Select
      data={organizations
        .filter((o) => o && !o.archivedAt)
        ?.filter((o) => {
          if (permission) {
            const currentOrg = profile.organizations?.[o._id];
            return !!currentOrg?.abilities?.[permission];
          }
          return true;
        })
        .map((org) => {
          return {
            logo: org?.navbarLogo,
            label: org?.givenName,
            value: org?._id,
            description: org?.shortDescription?.en || "",
          };
        })}
      itemComponent={DefaultItem}
      icon={<RiBuilding4Line size={14} />}
      maxDropdownHeight={200}
      nothingFound="No organizations found"
      placeholder="Select organization"
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
              <RiBuilding2Line size={18} />
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
