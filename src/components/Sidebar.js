import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/" className="sidebar-item">
            <i ></i>
            SELECT FIELDS
          </Link>
        </li>
        <li>
          <Link to="/" className="sidebar-item">
            <i id="sender-icon" className="fas"></i>
            Sender Form
          </Link>
        </li>
        <li>
          <Link to="/receiver" className="sidebar-item">
            <i id="receiver-icon" className="fas"></i>
            Receiver Form
          </Link>
        </li>
        <li>
          <Link to="/shipment" className="sidebar-item">
            <i id="shipment-icon" className="fas"></i>
            Shipment Form
          </Link>
        </li>
        <li>
          <Link to="/trackid" className="sidebar-item">
            <i id="track-id-icon" className="fas"></i>
            Track ID Form
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
