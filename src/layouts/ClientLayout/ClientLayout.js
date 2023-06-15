import React from "react";
import { Container } from "semantic-ui-react";
import { TopBar, Footer } from "../../components/Web";
import "./ClientLayout.scss";

export function ClientLayout(props) {
  const { children } = props;

  return (
    <div className="client-layout">
      <Container className="client-layout__header">
        <TopBar />
      </Container>

      <Container className="client-layout__content">{children}</Container>

      <Container className="client-layout__footer">
        <div className="client-layout__footer-components">
          <Footer.Info />
          <Footer.Newsletter />
        </div>
      </Container>
    </div>
  );
}
