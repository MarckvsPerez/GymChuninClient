import React, { useEffect, useState } from "react";
import { Dropdown, Image, Loader } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks";
import { User } from "api";
import { image } from "assets";
import { ENV } from "utils";
import "./UserButton.scss";

const userController = new User();

export function UserButton(props) {
  const { showText } = props;

  const { accessToken, logout } = useAuth();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const onLogout = () => {
    logout();
    navigate("/admin");
  };

  const onProfile = () => {
    navigate("/admin/profile");
  };

  if (!user) {
    return <Loader active inline={true} />;
  }

  const trigger = (
    <div className="profile">
      {showText ? (
        <p>
          {user.firstname} {user.lastname}
        </p>
      ) : (
        ""
      )}
      <Image
        src={user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar}
      />
    </div>
  );

  const options = [
    {
      key: "user",
      text: (
        <span>
          Hola{" "}
          <strong>
            {user.firstname} {user.lastname}
          </strong>
        </span>
      ),
      disabled: true,
    },
    { key: "profile", text: "Cuenta", icon: "user", onClick: onProfile },
    {
      key: "sign-out",
      text: "Cerrar sesión",
      icon: "sign out",
      onClick: onLogout,
    },
  ];

  return (
    <Dropdown
      trigger={trigger}
      options={options}
      pointing="top right"
      icon={null}
    />
  );
}
