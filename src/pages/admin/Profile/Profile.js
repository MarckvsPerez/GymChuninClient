import React, { useEffect, useState } from "react";
import { User } from "api";
import { useAuth } from "hooks";
import { KabutoCard } from "components/Admin/Profile";
import { Loader } from "semantic-ui-react";
import "./Profile.scss";

const userController = new User();

export function Profile() {
  const { accessToken } = useAuth();
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await userController.getMe(accessToken);
        setUser(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [accessToken]);

  if (!user) return <Loader active inline="centered" />;

  return (
    <div className="profile-content">
      <KabutoCard user={user} />
    </div>
  );
}
