import React from "react";
import { AdminMenu, AdminTopBar } from "components/Admin/AdminLayout";
import { Menu, Segment, Sidebar, Container } from "semantic-ui-react";
import "./AdminLayout.scss";

export function AdminLayout(props) {
  const { children } = props;
  const [visible, setVisible] = React.useState(false);

  const handleClick = () => {
    setVisible((prevState) => !prevState);
  };

  return (
    <Sidebar.Pushable as={Segment} className="admin-layout">
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width="thin"
      >
        <AdminMenu />
      </Sidebar>

      <Container>
        <Sidebar.Pusher>
          <Segment basic>
            <div className="bar">
              <AdminTopBar handleClick={handleClick} visible={visible} />
            </div>
            <div className="content">{children}</div>
          </Segment>
        </Sidebar.Pusher>
      </Container>
    </Sidebar.Pushable>
  );
}
