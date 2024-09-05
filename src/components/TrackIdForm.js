import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormLayout from "./FormLayout";

function generateUniqueTrackId() {
  // Generate a unique 10-digit number
  const min = 1000000000; // 10^9
  const max = 9999999999; // 10^10 - 1
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function TrackIdForm() {
  const { state } = useLocation();
  const { sender, receiver, shipment, progress } = state || {};
  const [trackId, setTrackId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Generate a unique Track ID when the component mounts
    const uniqueTrackId = generateUniqueTrackId();
    setTrackId(uniqueTrackId);
  }, []);

  const handleSave = () => {
    if (/^\d{10}$/.test(trackId)) {
      navigate("/barcode", { state: { sender, receiver, shipment, trackId, progress: { ...progress, trackId: true } } });
    } else {
      setError("Track ID must be exactly 10 digits.");
    }
  };

  return (
    <FormLayout progress={{ ...progress, trackId: !!trackId }}>
      <h3>Track ID Form</h3>
      <div className="form-group">
        <label htmlFor="trackId">Track ID</label>
        <input
          type="text" // Change type to text to accommodate generated ID
          id="trackId"
          name="trackId"
          value={trackId}
          readOnly // Make input read-only
          placeholder="Track ID"
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleSave}>Save</button>
    </FormLayout>
  );
}

export default TrackIdForm;
