import "./App.css";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import Countries from "./Components/Countries";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Country from "./Components/Country";
import FavCountry from "./Components/FavCountry";
import { FavoriteProvider } from "./Context/favContext";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/country_app" element={<Countries></Countries>}></Route>
          <Route path="/country/:name" element={<Country></Country>}></Route>

          <Route
            exact
            path="/favcountry"
            element={<FavCountry></FavCountry>}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
