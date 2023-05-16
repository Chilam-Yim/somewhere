import React from "react";


const Map = ({ place }) => {
    const apiKey = "AIzaSyDdoWU69p5txg4PnE2kk2u8WkKr1ffNx84";
    const parameters=`q=${place}&zoom=5`;
const src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&${parameters}`;

return (
  <iframe
    title="Google Maps"
    width="440"
    height="500"
    frameBorder="0"
    style={{ border: 0,paddingLeft:20,paddingRight:20 }}
    src={src}
    allowFullScreen
  ></iframe>
);

}
export default Map;

//
