import { React, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./utils/Auth";
import PrivateRoute from "./utils/PrivateRoute";

import Nav from "./common/NavBar";

import Login from "./components/Login";
import CreateAcc from "./components/CreateAcc";
import Dash from "./components/Dash";

export default function App() {
  useEffect(() => {
    document.body.style.backgroundColor = "#1e1e1e";
  }, []);
  return (
    <AuthProvider>
      <Routes>
        {/* public routes */}
        <Route
          path="/"
          element={
            <>
              <Nav />
              <Login />
            </>
          }
        />

        <Route
          path="/Create_acc"
          element={
            <>
              <Nav />
              <CreateAcc />
            </>
          }
        />
        {/* Private Routes */}
        <Route
          path="/dash"
          element={
            <>
              <PrivateRoute location={useLocation()}>
                <Dash />
              </PrivateRoute>
            </>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
