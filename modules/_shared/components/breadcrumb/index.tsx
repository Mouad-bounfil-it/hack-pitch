import { Breadcrumbs, BreadcrumbsProps } from "@mantine/core";
import Link from "next/link";
import { ReactNode } from "react";
import { FaAngleRight } from "react-icons/fa";

type breadcrumbItemT = {
  title: string;
  href?: string | null;
  icon?: ReactNode;
};

interface BreadCrumbI extends Omit<BreadcrumbsProps, "children"> {
  items: breadcrumbItemT[];
}

export default function BreadCrumb({ items = [], ...props }: BreadCrumbI) {
  return (
    <Breadcrumbs
      separator={<FaAngleRight size={14} className="-mx-2 text-slate-500" />}
      {...props}
    >
      {items.map((item, index) => (
        <BreadcrumbItem key={index} {...item} />
      ))}
    </Breadcrumbs>
  );
}

function BreadcrumbItem({
  title = "",
  href = null,
  icon = null,
}: breadcrumbItemT) {
  if (href) {
    return (
      <Link href={href}>
        <a className="flex items-center max-w-[12rem] space-x-1 text-slate-600 hover:text-slate-700 hover:bg-slate-100 py-0.5 px-2 rounded-md">
          {icon ? <div className="shrink-0">{icon}</div> : null}
          <span className="text-base font-medium truncate first-letter:capitalize">
            {title}
          </span>
        </a>
      </Link>
    );
  }

  return (
    <div className="flex items-center max-w-[12rem] space-x-1 text-slate-600 py-0.5 px-2">
      {icon ? <div className="shrink-0">{icon}</div> : null}
      <span className="text-base font-medium truncate first-letter:capitalize">
        {title}
      </span>
    </div>
  );
}
