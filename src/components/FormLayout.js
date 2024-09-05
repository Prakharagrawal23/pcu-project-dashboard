import React from "react";
import Tracker from "./Tracker";
import "./FormLayout.css";

function FormLayout({ children, progress }) {
  return (
    <div class="hello">
      <div className="form-layout">
      <div className="form-content">
        {children}
      </div>
      <div className="form-tracker">
        <Tracker progress={progress} />
      </div>
    </div>
    </div>
  );
}

export default FormLayout;
