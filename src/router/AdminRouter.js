import React from "react";
import { Routes, Route } from "react-router-dom";
import { AdminLayout, ClientLayout } from "../layouts";
import {
  Auth,
  Users,
  Exercise,
  Menu,
  Newsletter,
  Profile,
  Likes,
} from "../pages/admin";
import { useAuth } from "../hooks";

export function AdminRouter() {
  const { user } = useAuth();

  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      {!user ? (
        <Route path="/admin/*" element={loadLayout(ClientLayout, Auth)} />
      ) : (
        <>
          {["/admin", "/admin/profile"].map((path) => (
            <Route
              key={path}
              path={path}
              element={loadLayout(AdminLayout, Profile)}
            />
          ))}
          <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
          <Route path="/admin/menu" element={loadLayout(AdminLayout, Menu)} />
          <Route
            path="/admin/exercises"
            element={loadLayout(AdminLayout, Exercise)}
          />
          <Route
            path="/admin/newsletter"
            element={loadLayout(AdminLayout, Newsletter)}
          />
          <Route path="/admin/likes" element={loadLayout(AdminLayout, Likes)} />
        </>
      )}
    </Routes>
  );
}
