import React, { useState, useEffect } from "react";
import { Loader, Image, Card } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Exercise as ExerciseController } from "api";
import { ENV } from "utils";
import { DateTime } from "luxon";
import { LikeButton } from "components/Shared";
import "./Exercise.scss";

const exerciseController = new ExerciseController();

export function Exercise() {
  const [exercise, setExercise] = useState(null);
  const { path } = useParams();
  const date = exercise ? new Date(exercise.created_at) : "";

  useEffect(() => {
    (async () => {
      try {
        const response = await exerciseController.getExercisePath(path);
        setExercise(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [path]);

  if (!exercise) return <Loader active inline="centered" />;

  return (
    <div className="exercise">
      <Card>
        <Image
          src={`${ENV.BASE_PATH}/${exercise.miniature}`}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{exercise.title}</Card.Header>
          <Card.Meta>
            <span className="date">
              {DateTime.fromISO(date.toISOString())
                .setLocale("es")
                .toFormat("dd 'de' LLLL 'del' yyyy")}
            </span>
          </Card.Meta>
          <Card.Description>{exercise.muscle}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <LikeButton exercise={exercise} showText={true} />
        </Card.Content>
      </Card>
      <div className="contentMain">
        <h1>{exercise.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: exercise.content }} />
      </div>
    </div>
  );
}
