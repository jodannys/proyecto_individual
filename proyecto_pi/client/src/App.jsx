import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Card from "./components/card/Card";
import Detail from "./components/detail/Detail";
import FormPage from "./components/formPage/FormPage";
import Input from "./components/input/Input";
import SearhBar from "./components/searhBar/SearhBar";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/card" element={<Card />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/formPage" element={<FormPage/>} />
        <Route path="/input" element={<Input/>} />
        <Route path="/searchBar" element={<SearhBar/>} />
      </Routes>
    </Router>
  );
}

export default App;
