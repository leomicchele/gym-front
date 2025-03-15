import React, { useEffect, useRef, useState } from "react";
import { DatePicker } from "./DatePicker";

const CustomDatePicker = () => {
  const selectedDay = (val) =>{
    console.log(val)
};

const fechaActual = new Date();
    let fechaNueva = new Date(fechaActual);
    // fechaNueva.setDate(fechaNueva.getDate() - 3)

return (
  <div className="d-flex justify-content-center mb-4">
      <DatePicker startDate={new Date(fechaNueva)} 
                  days={7}
                  endDate={7}
                  selectDate={new Date()}
                  getSelectedDay={selectedDay} 
                  labelFormat={"MMMM"} 
                  color={"#3498db"}/>
  </div>
);
  }

export default CustomDatePicker;