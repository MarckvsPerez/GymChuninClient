import React, { useState, useEffect } from "react";
import { Image, Button, Icon, Confirm, Dropdown } from "semantic-ui-react";
import { image } from "../../../../assets";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { BasicModal } from "../../../Shared";
import { ENV } from "../../../../utils";
import { UserForm } from "../UserForm";
import "./UserItem.scss";

const userController = new User();

export function UserItem(props) {
  const { user, onReload } = props;
  const { accessToken } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const openUpdateUser = () => {
    setTitleModal(`Actualizar ${user.email}`);
    onOpenCloseModal();
  };

  const openDesactivateActivateConfim = () => {
    setIsDelete(false);
    setConfirmMessage(
      user.active
        ? `Desactivar usuario ${user.email}`
        : `Activar usuario ${user.email}`
    );
    onOpenCloseConfirm();
  };

  const onActivateDesactivate = async () => {
    try {
      await userController.updateUser(accessToken, user._id, {
        active: !user.active,
      });
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  const openDeleteConfirm = () => {
    setIsDelete(true);
    setConfirmMessage(`Eliminar usuario ${user.email}`);
    onOpenCloseConfirm();
  };

  const onDelete = async () => {
    try {
      await userController.deleteUser(accessToken, user._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Cambia el valor de 768 según tus necesidades
    };

    handleResize(); // Comprobar el tamaño inicial al cargar la página

    window.addEventListener("resize", handleResize); // Agregar el evento de redimensionamiento

    return () => {
      window.removeEventListener("resize", handleResize); // Limpiar el evento al desmontar el componente
    };
  }, []);

  return (
    <>
      <div className="user-item">
        <div className="user-item__info">
          <Image
            avatar
            src={
              user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar
            }
          />
          <div>
            <p>
              {user.firstname} {user.lastname}
            </p>
            <p>{user.email}</p>
          </div>
        </div>

        <div>
          {isMobile ? (
            <Dropdown icon="cog" pointing="right" button className="icon">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Button icon primary onClick={openUpdateUser}>
                    <Icon name="pencil" />
                  </Button>
                  <Button
                    icon
                    color={user.active ? "orange" : "teal"}
                    onClick={openDesactivateActivateConfim}
                  >
                    <Icon name={user.active ? "ban" : "check"} />
                  </Button>
                  <Button icon color="red" onClick={openDeleteConfirm}>
                    <Icon name="trash" />
                  </Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <Button icon primary onClick={openUpdateUser}>
                <Icon name="pencil" />
              </Button>
              <Button
                icon
                color={user.active ? "orange" : "teal"}
                onClick={openDesactivateActivateConfim}
              >
                <Icon name={user.active ? "ban" : "check"} />
              </Button>
              <Button icon color="red" onClick={openDeleteConfirm}>
                <Icon name="trash" />
              </Button>
            </>
          )}
        </div>
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <UserForm close={onOpenCloseModal} onReload={onReload} user={user} />
      </BasicModal>

      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={isDelete ? onDelete : onActivateDesactivate}
        content={confirmMessage}
        size="mini"
      />
    </>
  );
}
