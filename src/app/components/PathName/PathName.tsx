import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbProps {
  paths: { label: string; href?: string }[];
}

function Breadcrumbs({ paths }: BreadcrumbProps) {
  return (
    <div className="mb-6">
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {path.href ? (
                <BreadcrumbLink href={path.href}>{path.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{path.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < paths.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
    {/* Ligne séparatrice */}
    <div className="flex-grow border-t border-gray-300 mt-3 mx-4"></div>
    </div>
  );
}

export default Breadcrumbs;
