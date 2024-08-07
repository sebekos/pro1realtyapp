import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, About, Agents, Contact, Footer, Login } from "./components";
import { Provider } from "react-redux";
import { store } from "./reduxToolKit/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<About />} />
          <Route exact path="/agents" element={<Agents />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
