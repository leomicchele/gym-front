import { useState } from "react";
import { CheckOkEdit } from "../../Atoms/icons/CheckOkEdit";
import { Edit } from "../../Atoms/icons/Edit";

export const FichaAlumnoPlaceHolder = ({}) => {
  return (
    <>
      <ul className="list-group fs-6 text-start">
        <li className="list-group-item d-flex align-items-center gap-2">
          <div className="d-flex align-items-center gap-2 ">
            <span className="fw-semibold">ESTADO: </span>
          </div>
              <p className="placeholder-glow my-0 d-flex w-50">
                <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
              </p>
        </li>
        <li className="list-group-item d-flex align-items-center gap-2">
          <span className="fw-semibold">EDAD: </span>
          <p className="placeholder-glow my-0 d-flex w-50">
            <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
          </p>
        </li>
        <li className="list-group-item d-flex align-items-center gap-2">
          <span className="fw-semibold">PESO: </span>
          <p className="placeholder-glow my-0 d-flex w-50">
            <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
          </p>
          <span className="fw-normal fst-italic"> Kg </span>
        </li>
        <li className="list-group-item d-flex align-items-center gap-2">
          <span className="fw-semibold">ALTURA: </span>
          <p className="placeholder-glow my-0 d-flex w-50">
            <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
          </p>
          <span className="fw-normal fst-italic">Cm </span>
        </li>
        <li className="list-group-item d-flex align-items-center gap-2">
          <span className="fw-semibold">Grasa Corp: </span>
          <p className="placeholder-glow my-0 d-flex w-50">
            <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
          </p>
          <span className="fw-normal fst-italic"> % </span>
        </li>
        <li className="list-group-item d-flex align-items-center gap-2">
          <span className="fw-semibold">DNI: </span>
          <p className="placeholder-glow my-0 d-flex w-50">
            <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
          </p>{" "}
          
        </li>
        <li className="list-group-item d-flex align-items-center gap-2">
          <span className="fw-semibold">EXPERIENCIA: </span>
          <p className="placeholder-glow my-0 d-flex w-50">
            <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
          </p>{" "}
          
        </li>
        <li className="list-group-item d-flex align-items-center gap-2">
          <span className="fw-semibold">LESIÓN: </span>
          <p className="placeholder-glow my-0 d-flex w-50">
            <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
          </p>{" "}
          
        </li>
        <li className="list-group-item d-flex align-items-center gap-2">
          <span className="fw-semibold">PATOLOGÍA: </span>
          <p className="placeholder-glow my-0 d-flex w-50">
            <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
          </p>{" "}
          
        </li>
        <li className="list-group-item d-flex align-items-center gap-2">
          <span className="fw-semibold">OBJETIVO: </span>
          <p className="placeholder-glow my-0 d-flex w-50">
            <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
          </p>{" "}
          
        </li>
        <li className="list-group-item d-flex align-items-center gap-2">
          <span className="fw-semibold">DÍAS SEMANALES: </span>
          <p className="placeholder-glow my-0 d-flex w-50">
            <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
          </p>{" "}
          
        </li>
        <li className="list-group-item d-flex align-items-center gap-2">
          <span className="fw-semibold">DEPORTE: </span>
          <p className="placeholder-glow my-0 d-flex w-50">
            <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
          </p>{" "}
          
        </li>
        {/* <li className="list-group-item d-flex align-items-center gap-2">
                    <span className="fw-semibold">PASSWORD: </span> 
                    <span>{"******"}</span>
                                        
                  </li> */}
        <li className="list-group-item d-flex align-items-center gap-2">
          <span className="fw-semibold">PROFESOR: </span>
          <p className="placeholder-glow my-0 d-flex w-50">
            <span className="placeholder col-12 placeholder-sm bg-secondary"></span>
          </p>
        </li>
      </ul>
    </>
  );
};
