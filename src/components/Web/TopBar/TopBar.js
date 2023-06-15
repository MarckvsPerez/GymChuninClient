import React, { useState, useEffect } from "react";
import { Container, Loader, Button, Dropdown } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { Menu, User } from "../../../api";
import { Icon as icon } from "assets";
import { UserButton, LoginRegister } from "components/Shared";
import { useAuth } from "hooks";
import "./TopBar.scss";

const userController = new User();
const menuController = new Menu();

export function TopBar() {
  const [menu, setMenu] = useState(null);
  const { accessToken } = useAuth();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { pathname } = useLocation();

  const isCurrentPath = (path) => {
    if (path === pathname) return true;
    return false;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (accessToken) {
          const responseUser = await userController.getMe(accessToken);
          if (responseUser && responseUser._id) {
            setUser(responseUser);
          } else {
            setUser(null);
          }
        }

        const responseMenu = await menuController.getMenu(true);
        setMenu(responseMenu);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <div className="top-bar">
      <Container>
        <div className="top-bar__left">
          <div className="menu">
            {isLoading ? (
              <Loader active inline={true} />
            ) : (
              menu &&
              menu.map((item) => (
                <Button
                  key={item._id}
                  as="a"
                  href={item.path}
                  active={isCurrentPath(item.path)}
                >
                  {item.title}
                </Button>
              ))
            )}
          </div>
          <div className="menuIcon">
            <Dropdown icon="bars" className="icon">
              <Dropdown.Menu>
                <Dropdown.Header content="Menu" />
                <Dropdown.Divider />
                {menu &&
                  menu.map((item) => (
                    <Dropdown.Item
                      key={item._id}
                      as="a"
                      href={item.path}
                      active={isCurrentPath(item.path)}
                    >
                      {item.title}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="top-bar__center">
          <Link to="/" className="logo">
            <icon.LogoWhite />
          </Link>
        </div>
        <div className="top-bar__right">
          {isLoading ? (
            <Loader active inline={true} />
          ) : user ? (
            <UserButton showText={true} />
          ) : (
            <LoginRegister />
          )}
        </div>
      </Container>
    </div>
  );
}
