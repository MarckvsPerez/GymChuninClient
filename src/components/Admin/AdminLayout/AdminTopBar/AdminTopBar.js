import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Icon as icon } from "assets";
import "./AdminTopBar.scss";

export function AdminTopBar(props) {
  const { handleClick, visible } = props;

  const showSidebar = () => {
    handleClick();
  };

  return (
    <div className="top-barAdmin">
      <div className="top-barAdmin__left"></div>
      <div className="top-barAdmin__center">
        <Link to="/" className="logo">
          <icon.LogoWhite />
        </Link>
      </div>
      <div className="top-barAdmin__right">
        <Button onClick={showSidebar} icon>
          {!visible ? <Icon name="bars" /> : <Icon name="close" />}
        </Button>
      </div>
    </div>
  );
}
