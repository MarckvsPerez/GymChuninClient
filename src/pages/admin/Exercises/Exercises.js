import React, { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import { map } from "lodash";
import { ExerciseForm, ListExercise } from "../../../components/Admin/Exercise";
import jsonData from "assets/muscles.json";
import "./Exercise.scss";

export function Exercise() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

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

  return (
    <>
      <div className="exercise-page">
        <div className="exercise-page__add">
          <Button primary onClick={onOpenCloseModal}>
            Nuevo ejercicio
          </Button>
        </div>

        <Tab
          menu={{ secondary: true }}
          panes={panes}
          className="exercise-page__content"
        />
      </div>

      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="Crear nuevo ejercicio"
      >
        <ExerciseForm onClose={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
