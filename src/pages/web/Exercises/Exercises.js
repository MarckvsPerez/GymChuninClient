import React from "react";
import { Container } from "semantic-ui-react";
import { ListExercise } from "components/Web/Exercise";

export function Exercises() {
  return (
    <Container>
      Lista de ejercicios
      <ListExercise />
    </Container>
  );
}
