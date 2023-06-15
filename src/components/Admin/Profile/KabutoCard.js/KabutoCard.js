import React from "react";
import { Grid, Image } from "semantic-ui-react";
import { ENV } from "utils";
import { image } from "assets";
import { Icon as icon } from "assets";
import { RadarChart } from "components/Admin/Profile";
import "./Kabuto.scss";

export function KabutoCard(props) {
  const { user } = props;

  return (
    <div className="card">
      <div className="card__content">
        <div className="Top">
          <div className="svg-Container">
            <icon.LogoWhite />
          </div>
        </div>
        <div className="Header">
          <div className="Datos">
            <p>
              <span>Nombre: </span> {user.firstname}
            </p>
            <p>
              <span>Apellidos: </span> {user.lastname}
            </p>
          </div>
          <Image
            src={
              user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar
            }
          />
        </div>
        <div className="Main">
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <span>Email: </span>
                <p>{user.email}</p>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <p>
                  <span>Rol: </span>
                  {user.role}
                </p>
              </Grid.Column>
              <Grid.Column>
                <p>
                  <span>Activo: </span>
                  {user.active ? "Si" : "No"}
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <div className="Footer">
          <RadarChart user={user} />
        </div>
      </div>
    </div>
  );
}
