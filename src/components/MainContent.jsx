import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import { useForkRef } from "@mui/material";
import "moment/dist/locale/ar-dz";
moment.locale("ar");
export default function MainContent() {
 // STATES
 const [nextPrayerIndex, setNextPrayerIndex] = useState(2);
 const [loading, setLoading] = useState(false);

 const [timings, setTimings] = useState({ });

 const [remainingTime, setRemainingTime] = useState("");

 const [selectedCity, setSelectedCity] = useState({
  displayName: "دمشق",
  apiName: "Damascus",
 });

 const [today, setToday] = useState("");

 const avilableCities = [
  {
   displayName: "دمشق",
   apiName: "Damascus",
  },
  {
   displayName: "حمص",
   apiName: "Homs",
  },
  {
   displayName: "حماه",
   apiName: "Hama",
  },
 ];

 const prayersArray = [
  { key: "Fajr", displayName: "الفجر" },
  { key: "Dhuhr", displayName: "الظهر" },
  { key: "Asr", displayName: "العصر" },
  { key: "Sunset", displayName: "المغرب" },
  { key: "Isha", displayName: "العشاء" },
 ];
 const getTimings = async () => {
  setLoading(true)
  console.log("calling the api");
  const response = await axios.get(
   `https://api.aladhan.com/v1/timingsByCity?country=SY&city=${selectedCity.apiName}`
  );
  setTimings(response.data.data.timings);
  setLoading(false)

 };
 useEffect(() => {
  getTimings();
 }, [selectedCity]);

 useEffect(() => {
  let interval = setInterval(() => {
   console.log("calling timer");
   setupCountdownTimer();
  }, 1000);

  const t = moment();
  setToday(t.format("MMM Do YYYY | h:mm"));

  return () => {
   clearInterval(interval);
  };
 }, [timings]);

 // const data = await axios.get(
 //  "https://api.aladhan.com/v1/timingsByCity?country=SA&city=Riyadh"
 // );

 const setupCountdownTimer = () => {
  const momentNow = moment();

  let prayerIndex = 2;

  if (
   momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
   momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
  ) {
   prayerIndex = 1;
  } else if (
   momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
   momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
  ) {
   prayerIndex = 2;
  } else if (
   momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
   momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))
  ) {
   prayerIndex = 3;
  } else if (
   momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) &&
   momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
  ) {
   prayerIndex = 4;
  } else {
   prayerIndex = 0;
  }

  setNextPrayerIndex(prayerIndex);

  // now after knowing what the next prayer is, we can setup the countdown timer by getting the prayer's time
  const nextPrayerObject = prayersArray[prayerIndex];
  const nextPrayerTime = timings[nextPrayerObject.key];
  const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

  let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

  if (remainingTime < 0) {
   const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
   const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
    moment("00:00:00", "hh:mm:ss")
   );

   const totalDiffernce = midnightDiff + fajrToMidnightDiff;

   remainingTime = totalDiffernce;
  }
  console.log(remainingTime);

  const durationRemainingTime = moment.duration(remainingTime);

  setRemainingTime(`${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`);
   console.log(
    "duration issss ",
    durationRemainingTime.hours(),
    durationRemainingTime.minutes(),
    durationRemainingTime.seconds()
   );
  };
  const handleCityChange = (event) => {
   const cityObject = avilableCities.find((city) => {
    return city.apiName == event.target.value;
   });
   console.log("the new value is ", event.target.value);
   setSelectedCity(cityObject);
  };
  return (
    <>
    {loading ? (
      <div style={{display:"flex",justifyContent:"center",margin:"8px"}}>Loading...</div>
    ) : (<div>
<Grid container>
      <Grid xs={6} >
       <div>
        <h2>{today}</h2>
        <h1>{selectedCity.displayName}</h1>
       </div>
      </Grid>
  
      <Grid xs={6}>
       <div>
        <h2>
         متبقي حتى صلاة{" "}
         {prayersArray[nextPrayerIndex].displayName}
        </h2>
        <h1>{remainingTime}</h1>
       </div>
      </Grid>
     </Grid>
    </div>)}
     {/* TOP ROW */}
       
     <Divider style={{ borderColor: "white", opacity: "0.1" }} />
  
     {/* PRAYERS CARDS */}
     <Stack
     direction={{xs:'column',sm:'column',md:'row'}}
      justifyContent={{xs:"center",md:"center"}}
      alignItems={{xs:"center",sm:"center"}}
      style={{ marginTop: "50px" }}
     >
      <Prayer
       name="الفجر"
       time={timings.Fajr}
       image="https://i.pinimg.com/originals/d9/a7/f8/d9a7f8fc0ca07d20fde186175eda4f3b.jpg"
      />
      <Prayer
       name="الظهر"
       time={timings.Dhuhr}
       image="https://i.pinimg.com/originals/6a/4a/9f/6a4a9f1b69d600766a1b233f81345c3e.jpg"
      />
      <Prayer
       name="العصر"
       time={timings.Asr}
       image="https://i.pinimg.com/originals/17/ec/dd/17ecdd46b20df96e066bc63a233f9142.jpg"
      />
      <Prayer
       name="المغرب"
       time={timings.Sunset}
       image="https://i.pinimg.com/originals/78/ed/28/78ed2843751acd2f78fd3846610a84a7.jpg"
      />
      <Prayer
       name="العشاء"
       time={timings.Isha}
       image="https://i.pinimg.com/originals/3e/73/1c/3e731cc7317da735c01c6222d07c9bfb.jpg"
      />
     </Stack>
     {/*== PRAYERS CARDS ==*/}
  
     {/* SELECT CITY */}
     <Stack
      direction="row"
      justifyContent={"center"}
      style={{ marginTop: "40px" }}
     >
      <FormControl style={{ width: "20%" }}>
       <InputLabel id="demo-simple-select-label">
        <span style={{ color: "white" }}>المدينة</span>
       </InputLabel>
       <Select
        style={{ color: "white" }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Age"
        onChange={handleCityChange}
       >
        {avilableCities.map((city) => {
         return (
          <MenuItem
           value={city.apiName}
           key={city.apiName}
          >
           {city.displayName}
          </MenuItem>
         );
        })}
       </Select>
      </FormControl>
     </Stack>
    </>
   );
  }