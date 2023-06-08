import React from "react";
import { Icon } from "../../assets";
import { Link } from "react-router-dom";
import {
  AdminMenu,
  Logout,
  ProfileButton,
} from "../../components/Admin/AdminLayout";
import "./AdminLayout.scss";

export function AdminLayout(props) {
  const { children } = props;

  return (
    <div className="admin-layout">
      <div className="admin-layout__left">
        <Link to="/">
          <Icon.LogoWhite className="logo" />
        </Link>
        <AdminMenu />
      </div>
      <div className="admin-layout__right">
        <div className="admin-layout__right-header">
          <ProfileButton />
          <Logout />
        </div>
        <div className="admin-layout__right-content">{children}</div>
      </div>
    </div>
  );
}
