import React from "react";
import { Container } from "semantic-ui-react";
import "./Banner.scss";

export function Banner() {
  return (
    <div className="banner">
      <Container>
        <h1>
          ¡Descubre una nueva forma <br /> de alcanzar tu mejor versión!
        </h1>
        <h2>
          Transforma tu cuerpo con nuestra plataforma de ejercicios
          personalizados:
        </h2>
      </Container>

      <div className="banner__dark"></div>
    </div>
  );
}
