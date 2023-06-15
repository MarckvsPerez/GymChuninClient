import React from "react";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

export function LoginRegister() {
  const navigate = useNavigate();

  const onProfile = () => {
    navigate("/admin/profile");
  };

  return <Button onClick={onProfile}>Login</Button>;
}
