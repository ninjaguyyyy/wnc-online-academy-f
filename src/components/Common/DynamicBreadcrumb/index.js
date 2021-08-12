import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function DynamicBreadcrumb({ paths }) {
  return (
    <Breadcrumb>
      {paths.map((path) => (
        <Breadcrumb.Item active={!!!path.ref}>
          <Link to={path.ref} style={{ color: "inherit" }}>
            {path.label}
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
