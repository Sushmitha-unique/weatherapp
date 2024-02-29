import React, { useState, useEffect } from 'react'
import summer from "../Images/summer.avif"
import winter from "../Images/winter.avif"
 const Weather = () => {
  const [latitude,setlatitude] = useState(0);
  const [longitude,setlongitude] = useState(0);
  const [hemisphere,sethemisphere] = useState("");
  const [month,setmonth] = useState(()=>{
    return new Date().getMonth()+1
  })
    function fetch(){
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                setlatitude(position.coords.latitude);
                setlongitude(position.coords.longitude);

                if(position.coords.latitude > 0)
                {
                  sethemisphere("North");
                }
                else if(position.coords.longitude < 0)
                {
                  sethemisphere("south");
                }
                else{
                  sethemisphere("equator");
                }
            }
        )
    }
    useEffect (
      ()=>{
        fetch()
      },[]
    )
  return (
    <div>
        <h1>Latitude:{latitude}</h1>
        <h1>Longitude:{longitude}</h1>
        <h1>Hemisphere:{hemisphere}</h1>
        <h1>Month:{month}</h1>
        
        {
         hemisphere && (
          (hemisphere === "North" && month>=4 && month<=10) ||
          (hemisphere === "south" && (month<4 || month>10))
          ) &&
           (
            <div>
              <h1>Summer Season</h1>
              <img src= {summer} alt ="summer"/>
            </div>
          )
        }
        {
          hemisphere &&
           ((hemisphere === "North" && (month<4 || month>10)) || 
           (hemisphere === "south" && month>=4 && month<=10)) &&
          (
            <div>
              <h1>Winter Season</h1>
              <img src= {winter} alt ="winter"/>
            </div>
          )  
        }
    </div>
  )
}
export default Weather;
