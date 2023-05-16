
import './App.css';
import Photo from './Components/photo';
import Header from "./Components/header";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import React, { useState } from "react";


function App() {
  const [place, setPlace] = useState("");

  function handlePlaceChange(newPlace) {
    setPlace(newPlace);
  }

  
  return (
    <div className="App">
      <Header className="header" onPlaceChange={handlePlaceChange} />
      <Photo place={place} />

      <ArrowCircleUpIcon
        fontSize="large"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="ArrowCircleUpIcon"
      />

    </div>
  );
}

export default App;
