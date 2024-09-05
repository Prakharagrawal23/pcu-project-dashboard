import React, { useState } from "react";
import SenderForm from "./SenderForm.js";
import ReceiverForm from "./ReceiverForm";
import ShipmentForm from "./ShipmentForm";
import TrackIdForm from "./TrackIdForm";
import UpdateSidebar from "./UpdateSidebar";
import "./FormStepper.css";

function FormStepper() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    sender: "",
    receiver: "",
    shipment: "",
    trackId: "",
  });

  const nextStep = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setStep(step + 1);
  };

  const steps = [
    <SenderForm nextStep={nextStep} />,
    <ReceiverForm nextStep={nextStep} formData={formData} />,
    <ShipmentForm nextStep={nextStep} formData={formData} />,
    <TrackIdForm nextStep={nextStep} formData={formData} />,
  ];

  return (
    <div className="form-stepper-container">
      <div className="form-stepper">{steps[step]}</div>
      <UpdateSidebar step={step} formData={formData} />
    </div>
  );
}

export default FormStepper;
