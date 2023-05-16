import React, { useState } from "react";
import "../CSS/photo.css";
import { createApi } from "unsplash-js";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CircularProgress from "@mui/material/CircularProgress";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import cities from "./cities";
import Map from "./Map";
import Weather from "./weather";


const unsplashClient = createApi({
  accessKey: "ZaQANGly4TkH_XNtW6XpWr7i9ORX3CJpHXRZQkg094A",
});

function Photo(props) {
  const [destination, setDestination] = useState("");
  const [arrayCities, setArrayCities] = useState([]);
  const [progressBar, setProgressBar] = useState(false);
  const [slideOn, setSlideOn] = useState(false);
  const [videoOn,setVideoOn] = useState(true);

  const handleRandomCity = () => {
    const targetCity = cities[Math.floor(Math.random() * cities.length)];

    unsplashClient.search
      .getPhotos({
        query: targetCity,
        page: 1,
        perPage: 15,
        orientation: "landscape",
      })
      .then((data) => {
        console.log(data);
        setDestination(targetCity);
        setVideoOn(!videoOn);

        setProgressBar(true);
        setTimeout(() => {
          setArrayCities(data.response.results);
          setSlideOn(true);
          setProgressBar(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const images = arrayCities.map((city) => {
    return {
      original: city.urls.regular,
      thumbnail: city.urls.thumb,
      originalAlt: city.current_user_collections.description,
      thumbnailAlt: city.current_user_collections.description,
      originalTitle: city.current_user_collections.description,
      thumbnailTitle: city.current_user_collections.description,
      description: (
        <div className="imgContainer">
          <span style={{ color: "#d4d4d4" }}>Photo by</span>
          <span
            className="link"
            onClick={() => {
              window.open(
                city.user.links.html +
                  "?utm_source=somewhere&utm_medium=referral",
                "_blank"
              );
            }}
          >
            {" "}
            {city.user.name}
          </span>
          <span style={{ color: "#d4d4d4" }}> on </span>
          <span
            className="link"
            onClick={() => {
              window.open(
                "https://unsplash.com/?utm_source=somwhere&utm_medium=referral",
                "_blank"
              );
            }}
          >
            Unsplash{" "}
          </span>
          <div
            style={{ color: "#d4d4d4", marginTop: "4px", textAlign: "left" }}
          >
            Click{" "}
            <span
              className="link"
              onClick={() => {
                window.open(
                  city.urls.raw + "?utm_source=somewhere&utm_medium=referral",
                  "_blank"
                );
              }}
            >
              here
            </span>
            <span style={{ color: "#d4d4d4" }}> for photo URL </span>
          </div>
        </div>
      ),
    };
  });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

 const place = {
  searchCity: props.place, 
  randomCity: destination
 }

  return (
    <div>
      <button
        className="Button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleRandomCity}
      >
        <div
          className={`Button__overlay ${
            isHovered ? "Button__overlay--active" : ""
          }`}
        ></div>
        <span className="Button__text">Discover a new city</span>
      </button>
      {videoOn && (
        <div>
          <video
            className="video"
            src="/travel_video.mp4"
            muted
            autoPlay
            onEnded={(e) => {
              e.target.play();
            }}
          />
        </div>
      )}
      {slideOn && (
        <div className="place">
          <LocationOnIcon style={{ fontSize: "40px", color: "#ffaa00" }} />{" "}
          <div style={{ fontSize: "25px" }}>{destination}</div>
        </div>
      )}
      {/* <div>Props.place: {props.place}</div> */}
      <div className="progressBar">
        <div>
          {progressBar && <CircularProgress style={{ color: "#ffaa00" }} />}
        </div>
      </div>
      <div className="left_and_right" style={{ display: "flex" }}>
        {slideOn && (
          <div className="left_map">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <Map className="map" place={destination} />
              </div>
              <div className="weather">
                <Weather place={place} />
              </div>
            </div>
          </div>
        )}

        {slideOn && (
          <div style={{ flex: "70%" }} className="right_PhotoContainer">
            {" "}
            <ImageGallery
              items={images}
              // thumbnailPosition="left"
              className="image-gallery"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export { Photo as default };



