import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import "./ProfileButton.scss";

export function ProfileButton() {
  const { pathname } = useLocation();

  const isCurrentPath = (path) => {
    if (path === pathname) return true;
    return false;
  };

  return (
    <Button
      icon
      color="green"
      active={isCurrentPath("/admin/profile")}
      as={Link}
      to="/admin/profile"
    >
      <Icon name="user circle" />
    </Button>
  );
}
