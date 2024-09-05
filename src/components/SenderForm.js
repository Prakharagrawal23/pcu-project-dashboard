import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormLayout from "./FormLayout";

function SenderForm() {
  const { state } = useLocation();
  const { progress } = state || {};
  const [fields, setFields] = useState({ name: "", address: "", phone: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const handleNext = async () => {
    if (fields.name.trim() && fields.address.trim() && fields.phone.trim()) {
      try {
        // POST request to save sender data to the backend
        const response = await fetch("http://localhost:5000/sender/submit", {
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

        // Navigate to the next form (shipment form) after successful save
        navigate("/receiver", { state: { sender: fields, progress: { ...progress, sender: true } } });
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <FormLayout progress={{ ...progress, sender: !!fields.name }}>
      <h3>Sender Form</h3>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={fields.name}
          onChange={handleChange}
          placeholder="Enter sender name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={fields.address}
          onChange={handleChange}
          placeholder="Enter sender address"
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={fields.phone}
          onChange={handleChange}
          placeholder="Enter sender phone number"
        />
      </div>
      <button onClick={handleNext} disabled={!fields.name.trim() || !fields.address.trim() || !fields.phone.trim()}>
        Next
      </button>
    </FormLayout>
  );
}

export default SenderForm;
