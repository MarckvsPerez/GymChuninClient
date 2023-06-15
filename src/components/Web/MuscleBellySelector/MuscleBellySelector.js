import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { Icon } from "assets";
import jsonData from "assets/muscles.json";
import "./MuscleBellySelector.scss";

export function MuscleBellySelector(props) {
  const { muscleGroup } = props;
  const [belly, setBelly] = useState(null);
  const [description, setDescription] = useState(null);
  const svgRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setBelly("");
    setDescription("");
  }, [muscleGroup]);

  useEffect(() => {
    if (belly) {
      const svgElement = svgRef.current; // Obtiene el elemento SVG
      const groups = svgElement.querySelectorAll("g"); // Obtiene todos los elementos <g> dentro del SVG

      groups.forEach((group) => {
        const groupId = group.getAttribute("id");

        // Verifica si el id coincide con la variable belly
        if (groupId === belly) {
          group.classList.add("selected");
        } else {
          group.classList.remove("selected");
        }
      });
      const muscleData = jsonData.musculos[muscleGroup].find(
        (muscle) => muscle.nombre === belly
      );
      const descripcion = muscleData ? muscleData.descripcion : "";
      setDescription(descripcion);
    }
  }, [belly]);

  const onClick = (event) => {
    const clickedId = event.target.id;
    if (clickedId) {
      setBelly(clickedId);
    }
  };

  const onClickSearch = () => {
    navigate(`exercises?muscleGroup=${muscleGroup}&muscle=${belly}`);
  };

  return (
    <>
      <div onClick={onClick} className="selector-container">
        {!muscleGroup ? (
          <Icon.Empty className="selector-container__detail" ref={svgRef} />
        ) : muscleGroup === "Deltoide" ? (
          <Icon.Hombro className="selector-container__detail" ref={svgRef} />
        ) : muscleGroup === "Brazo" ? (
          <Icon.Brazo className="selector-container__detail" ref={svgRef} />
        ) : muscleGroup === "Pectoral" ? (
          <Icon.Pectoral className="selector-container__detail" ref={svgRef} />
        ) : muscleGroup === "Abdominales" ? (
          <Icon.Abdomen className="selector-container__detail" ref={svgRef} />
        ) : muscleGroup === "Espalda" ? (
          <Icon.Espalda className="selector-container__detail" ref={svgRef} />
        ) : muscleGroup === "Cuadriceps" ? (
          <Icon.Cuadriceps
            className="selector-container__detail"
            ref={svgRef}
          />
        ) : muscleGroup === "Gluteos" ? (
          <Icon.Gluteos className="selector-container__detail" ref={svgRef} />
        ) : muscleGroup === "Isquiotibiales" ? (
          <Icon.Isquios className="selector-container__detail" ref={svgRef} />
        ) : muscleGroup === "Gemelos" ? (
          <Icon.Gemelos className="selector-container__detail" ref={svgRef} />
        ) : muscleGroup === "Aductores" ? (
          <Icon.Aductores className="selector-container__detail" ref={svgRef} />
        ) : muscleGroup === "Abductores" ? (
          <Icon.Abductores
            className="selector-container__detail"
            ref={svgRef}
          />
        ) : muscleGroup === "Pantorrilla" ? (
          <Icon.Pantorrilla
            className="selector-container__detail"
            ref={svgRef}
          />
        ) : null}
      </div>
      <div className="selector-result">
        {!muscleGroup ? (
          <>
            <div className="selector-result__header">
              <div className="header">
                <p>Selecciona un musculo</p>
              </div>
            </div>
            <div className="selector-result__content"></div>
          </>
        ) : (
          <>
            <div className="selector-result__header">
              <div className="header">
                <p>Has seleccionado:</p>
              </div>
              {!belly ? (
                <div className="title">
                  <p>{muscleGroup}</p>
                </div>
              ) : (
                <div className="title">
                  <p>{belly}</p>
                </div>
              )}
            </div>
            <div className="selector-result__content">
              <div className="text">
                {!belly ? (
                  <p>
                    Selecciona un músculo de la parte superior para una búsqueda
                    ams detallada
                  </p>
                ) : (
                  <p>{description}</p>
                )}
              </div>
            </div>
          </>
        )}
        <div className="selector-result__button-container">
          <Button fluid onClick={onClickSearch}>
            Buscar ejercicios
          </Button>
        </div>
      </div>
    </>
  );
}
