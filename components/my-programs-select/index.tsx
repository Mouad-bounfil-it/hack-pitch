import { forwardRef } from "react";

import { Avatar, Group, Select, Text } from "@mantine/core";
import { RiCalendarEventLine, RiSlideshowLine } from "react-icons/ri";

import type { SelectProps } from "@mantine/core";
import { ProgramAbilityTypes } from "@/types/ability-types";

import API from "@/router/index";

type MyProgramsSelectT = {
  organizationId?: string;
  companyId?: string;
  permission?: ProgramAbilityTypes;
  style?: "default";
} & Omit<SelectProps, "data">;

export default function MyProgramsSelect(props: MyProgramsSelectT) {
  const { profile, programs, companyEngagements } =
    API.v3.profile.useFindCurrentProfile();
  const { organizationId, companyId, permission, style, ...selectProps } =
    props;

  const companyProgramIds = companyEngagements
    .map((c) => {
      if (c.companyId == companyId) {
        return c.programId;
      }
    })
    .filter((e) => e);

  const companyPrograms = programs.filter((p) => {
    return companyProgramIds.includes(p?._id);
  });

  // need to filter programs by company if exist
  const data = companyId ? companyPrograms : programs;
  const options = data
    .filter((p) => {
      if (organizationId) {
        return p?.organizationId === organizationId;
      } else {
        return p;
      }
    })
    .filter((p) => {
      if (permission) {
        const currentProgram = profile?.programs?.[p._id];
        return !!currentProgram?.abilities?.[permission];
      }

      return true;
    })
    .map((program) => {
      return {
        logo: program?.logo,
        label: program?.displayName,
        value: program?._id,
      };
    });

  return (
    <Select
      data={options}
      itemComponent={DefaultItem}
      icon={<RiSlideshowLine size={14} />}
      maxDropdownHeight={200}
      nothingFound="No programs found"
      placeholder="Select program"
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
              <RiCalendarEventLine size={18} />
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
