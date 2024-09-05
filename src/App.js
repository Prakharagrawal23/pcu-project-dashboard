import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SenderForm from "./components/SenderForm";
import ReceiverForm from "./components/ReceiverForm";
import ShipmentForm from "./components/ShipmentForm";
import TrackIdForm from "./components/TrackIdForm";
import BarcodeGenerator from "./components/BarcodeGenerator";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar /> {/* Sidebar on the left */}
        <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column" }}>
          <Navbar />
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
            <Routes>
              <Route path="/" element={<SenderForm />} /> {/* SenderForm is rendered at the root path */}
              <Route path="/receiver" element={<ReceiverForm />} />
              <Route path="/shipment" element={<ShipmentForm />} />
              <Route path="/trackid" element={<TrackIdForm />} />
              <Route path="/barcode" element={<BarcodeGenerator />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
