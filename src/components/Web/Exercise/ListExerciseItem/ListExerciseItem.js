import React from "react";
import { Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { ENV } from "../../../../utils";
import "./ListExerciseItem.scss";

export function ListExerciseItem(props) {
  const { exercise } = props;
  const date = new Date(exercise.created_at);

  return (
    <Link className="list-post-item" to={`/exercise/${exercise.path}`}>
      <Image src={`${ENV.BASE_PATH}/${exercise.miniature}`} fluid />
      <h2>{exercise.title}</h2>
      <span>
        <Icon name="heart" /> {exercise.likedByUsers.length}
        {" · "}
        <Icon name="calendar" />
        {DateTime.fromISO(date.toISOString())
          .setLocale("es")
          .toFormat("dd 'de' LLLL 'del' yyyy")}
      </span>
    </Link>
  );
}
