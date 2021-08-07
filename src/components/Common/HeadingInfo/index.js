import React from "react";
import DynamicBreadcrumb from "../DynamicBreadcrumb";
import "./index.css";

export default function HeadingInfo({ title, paths }) {
  return (
    <div className="heading-info">
      <div>
        <h2>{title}</h2>
        <div style={{ width: "150px", margin: "auto" }}>
          <DynamicBreadcrumb paths={paths} />
        </div>
      </div>
    </div>
  );
}
