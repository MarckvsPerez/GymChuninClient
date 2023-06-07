import React, { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import { ExerciseForm, ListExercise } from "../../../components/Admin/Exercise";
import "./Exercise.scss";

export function Exercise() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Hombro",
      render: () => (
        <Tab.Pane attached={false}>
          <ListExercise muscle={"Hombro"} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Pecho",
      render: () => (
        <Tab.Pane attached={false}>
          <ListExercise muscle={"Pecho"} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Espalda",
      render: () => (
        <Tab.Pane attached={false}>
          <ListExercise
            muscle={"Espalda"}
            reload={reload}
            onReload={onReload}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Piernas",
      render: () => (
        <Tab.Pane attached={false}>
          <ListExercise
            muscle={"Piernas"}
            reload={reload}
            onReload={onReload}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Biceps",
      render: () => (
        <Tab.Pane attached={false}>
          <ListExercise muscle={"Biceps"} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Triceps",
      render: () => (
        <Tab.Pane attached={false}>
          <ListExercise
            muscle={"Triceps"}
            reload={reload}
            onReload={onReload}
          />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className="exercise-page">
        <div className="exercise-page__add">
          <Button primary onClick={onOpenCloseModal}>
            Nuevo ejercicio
          </Button>
        </div>

        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="Crear nuevo ejercicio"
      >
        <ExerciseForm close={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
