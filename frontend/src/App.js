import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import MoviesPage from "./Pages/Movielist/MainPage";
import CreateMovie from "./Pages/MoviesPage/CreateMovie";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";
import vectorImage from "./assets/Vectors.png";
import "./App.css";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/movie-page" element={<MoviesPage />} />
          <Route path="/create" element={<CreateMovie />} />
          <Route path="/edit/:id" element={<CreateMovie />} />
        </Route>
        <Route
          path="*"
          element={
            <h1 style={{ color: "white", textAlign: "center" }}>
              Error 404 - page not found
            </h1>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
