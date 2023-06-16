import React, { useEffect, useState } from "react";
import { Label, Icon, Transition, Popup, Button } from "semantic-ui-react";
import { useAuth } from "../../../hooks";
import { User, Like } from "api";

const userController = new User();
const likeController = new Like();

export function LikeButton(props) {
  const { exercise, showText } = props;

  const [user, setUser] = useState(null);
  const [likeState, setLikeState] = useState(null);
  const [likeCount, setLikeCount] = useState(exercise.likedByUsers.length);
  const [visible, setVisible] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userController.getMe(accessToken);
        if (response && response._id) {
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
    setVisible((prevStata) => !prevStata);
    if (user) {
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
        setLikeCount((prevCount) =>
          likeState ? prevCount - 1 : prevCount + 1
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      setShowPopup(true);
    }
  }

  return (
    <>
      <Popup
        content="Por favor, inicia sesión para dar like al ejercicio."
        open={showPopup}
        onClose={() => setShowPopup(false)}
        trigger={
          <Label>
            <Transition visible={visible} animation="pulse" duration={500}>
              <Icon
                onClick={likeExercise}
                name={likeState ? "heart" : "heart outline"}
              />
            </Transition>

            <Label.Detail>
              {likeCount} {showText ? "Me gustas" : ""}
            </Label.Detail>
          </Label>
        }
      />
    </>
  );
}
