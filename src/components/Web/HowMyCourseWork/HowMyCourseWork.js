import React from "react";
import { Container, Grid, Icon } from "semantic-ui-react";
import { map } from "lodash";
import { itemsData } from "./HowMyCoursesWork.data";
import "./HowMyCourseWork.scss";

export function HowMyCourseWork() {
  return (
    <Container className="how-my-courses-work">
      <h2>¿CÓMO FUNCIONA NUESTRA PÁGINA?</h2>
      <h4>
        Descubre el poder del entrenamiento enfocado en cada grupo muscular para
        alcanzar tu máximo potencial físico
      </h4>

      <div className="how-my-courses-work__items">
        <Grid columns={3} doubling stackable>
          {map(itemsData, (item, index) => (
            <Grid.Column key={index}>
              <div>
                <div>
                  <Icon name={item.icon} />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </Grid.Column>
          ))}
        </Grid>
      </div>
    </Container>
  );
}
