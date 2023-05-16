import React, { useState } from "react";
import "../CSS/header.css";
import SearchIcon from "@mui/icons-material/Search";
import Cities from "./cities";
import ClearIcon from "@mui/icons-material/Clear";

function Header(props) {
  const [inputValue, setInputValue] = useState("");
  const [showList, setShowList] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowList(true);
    props.onPlaceChange(e.target.value);
  };

  const handleListClick = (city) => {
    setInputValue(city);
    setShowList(false);
  };

  const filteredCities = Cities.filter((city) =>
    city.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="HeaderContainer">
      <div className="logoContainer">
        <img className="headerLogo" src="./somewhere_logo.png" style={{cursor:"pointer"}}alt="logo"  onClick={()=>{window.location.reload();}}></img>
        {/* <span className="jumpingText">Time to recharge!</span> */}
      </div>

      <div>
        <div className="searchBarContainer">
          <input
            type="text"
            placeholder="Search cities..."
            className="searchInput"
            style={{ color: "#ffffff" }}
            value={inputValue}
            onChange={handleInputChange}
            onClick={() => setShowList(true)}
            onBlur={() => setShowList(false)}
          />
          {showList && (

            <ul className="searchList">
              {filteredCities.map((city, index) => (
                <li
                  key={index}
                  onMouseDown={() => {
                    handleListClick(city);
                    console.log(city);
                  }}
                >
                  {city}
                </li>
              ))}
            </ul>
    
          )}
          <div className="cancelIcon"  onClick={() => setInputValue("")}>
            <ClearIcon style={{ color: "white", cursor: "pointer" }} />
          </div>
          <div className="searchIcon">
            <SearchIcon
              onClick={() => {
                props.onPlaceChange(inputValue);
                setInputValue("");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
