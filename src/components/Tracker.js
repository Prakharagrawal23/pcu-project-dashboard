import React from "react";
import "./Tracker.css";

function Tracker({ progress }) {
  return (
    <div className="tracker-container">
      <h3>Progress Tracker</h3>
      <ul>
        <li className={progress.sender ? "completed" : ""}>Sender Form</li>
        <li className={progress.receiver ? "completed" : ""}>Receiver Form</li>
        <li className={progress.shipment ? "completed" : ""}>Shipment Form</li>
        <li className={progress.trackId ? "completed" : ""}>Track ID Form</li>
      </ul>
    </div>
  );
}

export default Tracker;
