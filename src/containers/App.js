import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { init } from "../actions";
import Sidebar from "./Sidebar";

import Discover from "./Discover";
import Home from "./Home";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover/:name" element={<Discover />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
