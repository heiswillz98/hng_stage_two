import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, MovieDetails } from "./pages/index";
import { ThemeProvider } from "react-jss";

const theme = {
  colors: {
    blue: "#428bca",
  },
};
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies/:movie_id" element={<MovieDetails />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
