import React, { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import "./BarcodeGenerator.css";

function BarcodeGenerator() {
  const barcodeRef = useRef(null);
  const location = useLocation();
  const [showBarcode, setShowBarcode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [sender, setSender] = useState({ name: "", address: "", phone: "" });
  const [receiver, setReceiver] = useState({ name: "", address: "", phone: "" });
  const [shipment, setShipment] = useState({ description: "", weight: "", dimensions: "" });
  const [trackId, setTrackId] = useState("");

  // Initialize state with location data if available
  useEffect(() => {
    const { sender, receiver, shipment, trackId } = location.state || {};
    if (sender) setSender(sender);
    if (receiver) setReceiver(receiver);
    if (shipment) setShipment(shipment);
    if (trackId) setTrackId(trackId);
  }, [location.state]);

  // Update barcode when showBarcode or any of the fields change
  useEffect(() => {
    if (trackId && showBarcode && barcodeRef.current) {
      const barcodeData = `S:${sender.name},R:${receiver.name},Sh:${shipment.description},T:${trackId}`;
      JsBarcode(barcodeRef.current, barcodeData, {
        format: "CODE128",
        displayValue: true,
        fontSize: 18,
        width: 2,
        height: 50,
        margin: 0,
      });
    }
  }, [showBarcode, sender, receiver, shipment, trackId]);

  const handleDownloadPNG = async () => {
    const canvas = await html2canvas(
      document.querySelector(".barcode-container")
    );
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${trackId}-barcode.png`;
    link.click();
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    html2canvas(document.querySelector(".barcode-container")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save(`${trackId}-barcode.pdf`);
    });
  };

  const toggleBarcodeVisibility = () => {
    setShowBarcode(!showBarcode);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "senderName":
        setSender((prev) => ({ ...prev, name: value }));
        break;
      case "senderAddress":
        setSender((prev) => ({ ...prev, address: value }));
        break;
      case "senderPhone":
        setSender((prev) => ({ ...prev, phone: value }));
        break;
      case "receiverName":
        setReceiver((prev) => ({ ...prev, name: value }));
        break;
      case "receiverAddress":
        setReceiver((prev) => ({ ...prev, address: value }));
        break;
      case "receiverPhone":
        setReceiver((prev) => ({ ...prev, phone: value }));
        break;
      case "shipmentDescription":
        setShipment((prev) => ({ ...prev, description: value }));
        break;
      case "shipmentWeight":
        setShipment((prev) => ({ ...prev, weight: value }));
        break;
      case "shipmentDimensions":
        setShipment((prev) => ({ ...prev, dimensions: value }));
        break;
      default:
        break;
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Any additional logic to save the data can be added here
  };

  if (!trackId) {
    return (
      <div className="error">
        Track ID is missing. Please submit the form first.
      </div>
    );
  }

  return (
    <div className="barcode-container">
      <h3>Shipment Barcode</h3>
      <div className="details">
        <label>
          Sender Name:
          {isEditing ? (
            <input
              type="text"
              name="senderName"
              value={sender.name}
              onChange={handleFieldChange}
            />
          ) : (
            <span>{sender.name}</span>
          )}
        </label>
        <label>
          Sender Address:
          {isEditing ? (
            <input
              type="text"
              name="senderAddress"
              value={sender.address}
              onChange={handleFieldChange}
            />
          ) : (
            <span>{sender.address}</span>
          )}
        </label>
        <label>
          Sender Phone:
          {isEditing ? (
            <input
              type="text"
              name="senderPhone"
              value={sender.phone}
              onChange={handleFieldChange}
            />
          ) : (
            <span>{sender.phone}</span>
          )}
        </label>
        <label>
          Receiver Name:
          {isEditing ? (
            <input
              type="text"
              name="receiverName"
              value={receiver.name}
              onChange={handleFieldChange}
            />
          ) : (
            <span>{receiver.name}</span>
          )}
        </label>
        <label>
          Receiver Address:
          {isEditing ? (
            <input
              type="text"
              name="receiverAddress"
              value={receiver.address}
              onChange={handleFieldChange}
            />
          ) : (
            <span>{receiver.address}</span>
          )}
        </label>
        <label>
          Receiver Phone:
          {isEditing ? (
            <input
              type="text"
              name="receiverPhone"
              value={receiver.phone}
              onChange={handleFieldChange}
            />
          ) : (
            <span>{receiver.phone}</span>
          )}
        </label>
        <label>
          Shipment Description:
          {isEditing ? (
            <input
              type="text"
              name="shipmentDescription"
              value={shipment.description}
              onChange={handleFieldChange}
            />
          ) : (
            <span>{shipment.description}</span>
          )}
        </label>
        <label>
          Shipment Weight:
          {isEditing ? (
            <input
              type="text"
              name="shipmentWeight"
              value={shipment.weight}
              onChange={handleFieldChange}
            />
          ) : (
            <span>{shipment.weight}</span>
          )}
        </label>
        <label>
          Shipment Dimensions:
          {isEditing ? (
            <input
              type="text"
              name="shipmentDimensions"
              value={shipment.dimensions}
              onChange={handleFieldChange}
            />
          ) : (
            <span>{shipment.dimensions}</span>
          )}
        </label>
        <label>
          Track ID:
          <span>{trackId}</span>
        </label>
      </div>
      <div className="actions">
        {isEditing ? (
          <>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
        <button onClick={toggleBarcodeVisibility}>
          {showBarcode ? "Hide Barcode and Download Options" : "Show Barcode and Download Options"}
        </button>
      </div>
      {showBarcode && (
        <>
          <svg ref={barcodeRef}></svg>
          <div className="buttons">
            <button onClick={handleDownloadPNG}>Download as PNG</button>
            <button onClick={handleDownloadPDF}>Download as PDF</button>
          </div>
        </>
      )}
    </div>
  );
}

export default BarcodeGenerator;
