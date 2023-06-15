import React, { useState, useEffect } from "react";
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import { map } from "lodash";
import { ExerciseForm, ListExercise } from "../../../components/Admin/Exercise";
import jsonData from "assets/muscles.json";
import "./Exercise.scss";

export function Exercise() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const muscleGroups = Object.keys(jsonData.musculos).map((group) => ({
    key: group,
    text: group,
    value: group,
  }));

  const panes = map(muscleGroups, (muscle) => ({
    menuItem: muscle.value,
    render: () => (
      <Tab.Pane attached={false}>
        <ListExercise
          muscleGroup={muscle.value}
          reload={reload}
          onReload={onReload}
        />
      </Tab.Pane>
    ),
  }));

  panes.unshift({
    menuItem: "Todos",
    render: () => (
      <Tab.Pane attached={false}>
        <ListExercise muscleGroup={""} reload={reload} onReload={onReload} />
      </Tab.Pane>
    ),
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Cambia el valor de 768 según tus necesidades
    };

    handleResize(); // Comprobar el tamaño inicial al cargar la página

    window.addEventListener("resize", handleResize); // Agregar el evento de redimensionamiento

    return () => {
      window.removeEventListener("resize", handleResize); // Limpiar el evento al desmontar el componente
    };
  }, []);

  return (
    <>
      <div className="exercise-page">
        <div className="exercise-page__add">
          <Button primary onClick={onOpenCloseModal}>
            Nuevo ejercicio
          </Button>
        </div>

        <Tab
          menu={{
            fluid: true,
            vertical: !isMobile,
          }}
          menuPosition="left"
          panes={panes}
          className={
            !isMobile ? "exercise-page__content" : "exercise-mobile__content"
          }
        />
      </div>

      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="Crear nuevo ejercicio"
        size="large"
      >
        <ExerciseForm onClose={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
