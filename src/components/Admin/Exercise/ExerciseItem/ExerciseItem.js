import React, { useState } from "react";
import { ENV } from "utils";
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { image } from "assets";
import { Link } from "react-router-dom";
import { Exercise } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { BasicModal } from "../../../Shared";
import { ExerciseForm } from "../ExerciseForm";
import "./ExerciseItem.scss";

const ExerciseController = new Exercise();

export function ExerciseItem(props) {
  const { exercise, onReload } = props;
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { accessToken } = useAuth();

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      await ExerciseController.deleteExercise(accessToken, exercise._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="exercise-item">
        <div className="exercise-item__info">
          <Image
            src={
              exercise.miniature
                ? `${ENV.BASE_PATH}/${exercise.miniature}`
                : image.noAvatar
            }
          />

          <div>
            <p>{exercise.title}</p>
            <p> {exercise.muscle}</p>
          </div>
        </div>

        <div>
          <Button
            as={Link}
            icon
            to={`/exercise/${exercise.path}`}
            target="_blank"
          >
            <Icon name="eye" />
          </Button>
          <Button icon primary onClick={onOpenCloseModal}>
            <Icon name="pencil" />
          </Button>
          <Button icon color="red" onClick={onOpenCloseConfirm}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>

      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title="Editar ejercicio"
        size="large"
      >
        <ExerciseForm
          onClose={onOpenCloseModal}
          onReload={onReload}
          exercise={exercise}
        />
      </BasicModal>

      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content={`¿Eliminar ${exercise.title}?`}
        size="mini"
      />
    </>
  );
}
