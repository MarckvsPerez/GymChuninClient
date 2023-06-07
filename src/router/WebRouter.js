import React from "react";
import { Routes, Route } from "react-router-dom";
import { ClientLayout } from "../layouts";
import { Home, Exercise, Exercises } from "../pages/web";

export function WebRouter() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      <Route path="/" element={loadLayout(ClientLayout, Home)} />
      <Route path="/exercises" element={loadLayout(ClientLayout, Exercises)} />
      <Route
        path="/exercise/:path"
        element={loadLayout(ClientLayout, Exercise)}
      />
    </Routes>
  );
}
