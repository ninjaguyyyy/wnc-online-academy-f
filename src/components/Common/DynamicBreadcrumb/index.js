import React from "react";
import { Breadcrumb } from "react-bootstrap";

export default function DynamicBreadcrumb({ paths }) {
  return (
    <Breadcrumb>
      {paths.map((path) => (
        <Breadcrumb.Item href={path.ref} active={!!!path.ref}>
          {path.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
