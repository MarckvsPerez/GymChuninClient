import React, { useEffect, useState } from "react";
import { Label, Icon } from "semantic-ui-react";
import { useAuth } from "../../../hooks";
import { User, Like } from "api";

const userController = new User();
const likeController = new Like();

export function LikeButton(props) {
  const { exercise, showText } = props;

  const [user, setUser] = useState(null);
  const [likeState, setLikeState] = useState(null);
  const [likeCount, setLikeCount] = useState(exercise.likedByUsers.length);

  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userController.getMe(accessToken);
        if (response && response.firstname) {
          setUser(response);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [accessToken]);

  useEffect(() => {
    const fetchLike = async () => {
      try {
        if (user && exercise) {
          const response = await exercise.likedByUsers.includes(user._id);
          setLikeState(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchLike();
  }, [accessToken, user, exercise]);

  async function likeExercise() {
    try {
      const data = {
        userId: user._id,
        exerciseId: exercise._id,
      };

      if (!likeState) {
        await likeController.likeExercise(accessToken, data);
      } else {
        await likeController.unlikeExercise(accessToken, data);
      }

      setLikeState((prevStata) => !prevStata);
      setLikeCount((prevCount) => (likeState ? prevCount - 1 : prevCount + 1));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Label as="a" onClick={likeExercise}>
      <Icon name={likeState ? "heart" : "heart outline"} />
      {likeCount} {showText ? "Me gustas" : ""}
    </Label>
  );
}
