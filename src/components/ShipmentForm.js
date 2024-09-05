import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormLayout from "./FormLayout";

function ShipmentForm() {
  const { state } = useLocation();
  const { sender, receiver, progress } = state || {};
  const [fields, setFields] = useState({ description: "", weight: "", dimensions: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const handleNext = async () => {
    if (fields.description.trim() && fields.weight.trim() && fields.dimensions.trim()) {
      try {
        // POST request to save shipment data to the backend
        const response = await fetch("http://localhost:5000/shipment/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fields),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
        setFields({ description: "", weight: "", dimensions: "" });
        // Navigate to the next form (track ID form) after successful save
        navigate("/trackid", { state: { sender, receiver, shipment: fields, progress: { ...progress, shipment: true } } });
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <FormLayout progress={{ ...progress, shipment: !!fields.description }}>
      <h3>Shipment Form</h3>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={fields.description}
          onChange={handleChange}
          placeholder="Enter shipment description"
        />
      </div>
      <div className="form-group">
        <label htmlFor="weight">Weight</label>
        <input
          type="text"
          id="weight"
          name="weight"
          value={fields.weight}
          onChange={handleChange}
          placeholder="Enter shipment weight"
        />
      </div>
      <div className="form-group">
        <label htmlFor="dimensions">Dimensions</label>
        <input
          type="text"
          id="dimensions"
          name="dimensions"
          value={fields.dimensions}
          onChange={handleChange}
          placeholder="Enter shipment dimensions"
        />
      </div>
      <button onClick={handleNext} disabled={!fields.description.trim() || !fields.weight.trim() || !fields.dimensions.trim()}>
        Next
      </button>
    </FormLayout>
  );
}

export default ShipmentForm;
