import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../../hooks";
import "./AdminMenu.scss";

export function AdminMenu() {
  const { pathname } = useLocation();
  const {
    user: { role },
  } = useAuth();
  const isAdmin = role === "admin";

  const isCurrentPath = (path) => {
    if (path === pathname) return true;
    return false;
  };

  return (
    <Menu fluid vertical icon text className="admin-menu">
      <Menu.Item
        as={Link}
        to="/admin/profile"
        active={isCurrentPath("/admin/profile")}
      >
        <Icon name="user" />
        Perfil
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/admin/likes"
        active={isCurrentPath("/admin/likes")}
      >
        <Icon name="like" />
        Me gustas
      </Menu.Item>

      {isAdmin && (
        <>
          <Menu.Item
            as={Link}
            to="/admin/menu"
            active={isCurrentPath("/admin/menu")}
          >
            <Icon name="bars" />
            Menu
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/admin/users"
            active={isCurrentPath("/admin/users")}
          >
            <Icon name="users" />
            Usuarios
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/admin/newsletter"
            active={isCurrentPath("/admin/newsletter")}
          >
            <Icon name="mail" />
            Newsletter
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/admin/exercises"
            active={isCurrentPath("/admin/exercises")}
          >
            <Icon name="weight" />
            Ejercicios
          </Menu.Item>{" "}
        </>
      )}
    </Menu>
  );
}
