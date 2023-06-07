import React, { useState, useEffect } from "react";
import { Container, Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Exercise as ExerciseController } from "api";
import "./Exercise.scss";

const exerciseController = new ExerciseController();

export function Exercise() {
  const [exercise, setExercise] = useState(null);
  const { path } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await exerciseController.getExercisePath(path);
        console.log(response);
        setExercise(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [path]);

  if (!exercise) return <Loader active inline="centered" />;

  return (
    <Container className="exercise">
      <h1 className="title">{exercise.title}</h1>

      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: exercise.content }}
      />
    </Container>
  );
}
