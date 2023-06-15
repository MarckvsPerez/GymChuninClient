import React from "react";
import { Button, Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { socialData } from "../../../../utils";
import "./Info.scss";

export function Info() {
  return (
    <div className="footer-info">
      <div className="footer-info__logo">
        <div className="grid">
          <h4>Sobre mi</h4>

          <Grid columns={1}>
            <Grid.Column>
              <Link to="#">
                <Icon name="user" /> Marc Antoni Pérez Salat
              </Link>
              <Link to="#">
                <Icon name="student" /> UOC - Grau en Multimedia
              </Link>
              <Link to="#">
                <Icon name="mail" /> marcantoniperez@gmail.com
              </Link>
              <Link to="#">
                <Icon name="phone" /> 656 904 007
              </Link>
            </Grid.Column>
          </Grid>
        </div>
      </div>
      <div className="footer-info__content">
        <div className="text">
          <p>
            ¡No esperes más! Únete a nosotros y descubre cómo ponerse en forma
            puede transformar tu vida de manera positiva. Estamos emocionados de
            comenzar este viaje contigo.
          </p>
          {map(socialData, (social) => (
            <Button
              key={social.type}
              as="a"
              target="_blank"
              href={social.link}
              color={social.type === "github" ? "grey" : social.type}
              icon={social.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
