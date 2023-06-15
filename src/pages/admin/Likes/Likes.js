import React, { useState, useEffect } from "react";
import { Tab } from "semantic-ui-react";
import { map } from "lodash";
import jsonData from "assets/muscles.json";
import { LikesList } from "../../../components/Admin/Likes";
import "./Likes.scss";

export function Likes() {
  const [reload, setReload] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

  const muscleGroups = Object.keys(jsonData.musculos).map((group) => ({
    key: group,
    text: group,
    value: group,
  }));

  const panes = map(muscleGroups, (muscle) => ({
    menuItem: muscle.value,
    render: () => (
      <Tab.Pane attached={false}>
        <LikesList
          muscleFilter={muscle.value}
          reload={reload}
          onReload={onReload}
        />
      </Tab.Pane>
    ),
  }));

  panes.unshift({
    menuItem: "Todos",
    render: () => (
      <Tab.Pane attached={false}>
        <LikesList muscleFilter={""} reload={reload} onReload={onReload} />
      </Tab.Pane>
    ),
  });

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
      <div className={!isMobile ? "likes-page" : "likes-mobile"}>
        <Tab
          menu={{
            fluid: true,
            vertical: !isMobile,
          }}
          panes={panes}
          className={
            !isMobile ? "likes-page__content" : "likes-mobile__content"
          }
        />
      </div>
    </>
  );
}
