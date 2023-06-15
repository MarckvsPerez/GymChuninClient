import React, { useState, useEffect } from "react";
import { Tab, Button, Icon } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import { ListMenu, MenuForm } from "../../../components/Admin/Menu";
import "./Menu.scss";

export function Menu() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevStata) => !prevStata);

  const panes = [
    {
      menuItem: "Menus activos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListMenu active={true} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Menus inactivos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListMenu active={false} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
  ];

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
      <div className="menu-page">
        <Button
          className="menu-page__add"
          icon
          primary
          onClick={onOpenCloseModal}
        >
          {isMobile ? <Icon name="plus" /> : "Nuevo Menu"}
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title="Crear menu">
        <MenuForm onClose={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
