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
  <div className="d-flex justify-content-center my-3">
      <DatePicker startDate={new Date(fechaNueva)} 
                  days={5}
                  endDate={5}
                  selectDate={new Date()}
                  getSelectedDay={selectedDay} 
                  labelFormat={"MMMM"} 
                  color={"#374e8c"}/>


     
  </div>
);
  }

export default CustomDatePicker;