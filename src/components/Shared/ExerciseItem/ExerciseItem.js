import React, { useState, useEffect } from "react";
import { ENV } from "utils";
import { Image, Button, Icon, Confirm, Dropdown } from "semantic-ui-react";
import { image } from "assets";
import { Link } from "react-router-dom";
import { Exercise } from "../../../api";
import { useAuth } from "../../../hooks";
import { BasicModal } from "..";
import { ExerciseForm } from "../../Admin/Exercise/ExerciseForm";
import "./ExerciseItem.scss";

const ExerciseController = new Exercise();

export function ExerciseItem(props) {
  const { exercise, onReload, editable } = props;
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
            <p>
              <Icon name="heart" /> {exercise.likedByUsers.length}
            </p>
          </div>
        </div>

        <div>
          {isMobile && editable ? (
            <Dropdown icon="cog" pointing="right" button className="icon">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <>
                    <Button
                      as={Link}
                      icon
                      to={`/exercise/${exercise.path}`}
                      target="_blank"
                    >
                      <Icon name="eye" />
                    </Button>
                    {editable && (
                      <>
                        <Button icon primary onClick={onOpenCloseModal}>
                          <Icon name="pencil" />
                        </Button>
                        <Button icon color="red" onClick={onOpenCloseConfirm}>
                          <Icon name="trash" />
                        </Button>
                      </>
                    )}
                  </>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <Button
                as={Link}
                icon
                to={`/exercise/${exercise.path}`}
                target="_blank"
              >
                <Icon name="eye" />
              </Button>
              {editable && (
                <>
                  <Button icon primary onClick={onOpenCloseModal}>
                    <Icon name="pencil" />
                  </Button>
                  <Button icon color="red" onClick={onOpenCloseConfirm}>
                    <Icon name="trash" />
                  </Button>
                </>
              )}
            </>
          )}
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
