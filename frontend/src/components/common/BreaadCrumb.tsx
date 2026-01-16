import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbWithCustomSeparator() {
  const location = useLocation();

  const segments = location.pathname.split("/").filter(Boolean);
  const lastName = segments[segments.length - 1];
  const parentSegments = segments.slice(0, -1);

  const isIdParam = (segment: string): boolean => {
    const isUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        segment
      );
    const isNumeric = /^\d+$/.test(segment);
    const isObjectId = /^[0-9a-f]{24}$/i.test(segment);

    return isUUID || isNumeric || isObjectId;
  };

  if (segments.length === 1) return;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {parentSegments.map((s, i) => {
          const route = !isIdParam(s)
            ? "/" + segments.slice(0, i + 1).join("/")
            : segments.slice(0, i).join("/");
          return (
            <Fragment key={`breadcrumb-${i}`}>
              {i > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {!isIdParam(s) && (
                  <BreadcrumbLink className="hover:text-blue-300" asChild>
                    <Link to={route}>
                      {String(s).charAt(0).toUpperCase() + String(s).slice(1)}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
        {segments.length > 1 && <BreadcrumbSeparator />}
        <BreadcrumbItem>
          <BreadcrumbPage className="text-blue-500 font-medium">
            {!isIdParam(lastName)
              ? String(lastName).charAt(0).toUpperCase() +
                String(lastName).slice(1)
              : "Details"}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
