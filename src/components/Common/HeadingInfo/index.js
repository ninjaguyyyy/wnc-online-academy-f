import React from "react";
import { Breadcrumb } from "react-bootstrap";
import "./index.css";

export default function HeadingInfo({ title, paths }) {
  return (
    <div className="heading-info">
      <div>
        <h2>{title}</h2>
        <Breadcrumb>
          {paths.map((path) => (
            <Breadcrumb.Item href={path.ref} active={!!!path.ref}>
              {path.label}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
    </div>
  );
}
