import React from "react";
import { Image } from "semantic-ui-react";
import { ENV } from "utils";
import { image } from "assets";

export function KabutoCard(props) {
  const { user } = props;

  return (
    <div>
      <h2>{user.firstname}</h2>
      <h2>{user.lastname}</h2>
      <h2>{user.email}</h2>
      <Image
        src={user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar}
      />
    </div>
  );
}
