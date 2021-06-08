import React, { createContext, useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PrivetRoute from "./components/Login/PrivetRoute/PrivetRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import UsersBlogs from "./components/Dashboard/UsersBlogs/UsersBlogs";
import AddWriter from "./components/Dashboard/AddWriter/AddWriter";
import AddAdmin from "./components/Dashboard/Admin/AddAdmin";
import AddBlog from "./components/Dashboard/AddBlog/AddBlog";

export const UserContext = createContext()

const App = () => {
  const [user, setUser] = useState()
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Switch>
          <Route path="/usersBlogs">
            <UsersBlogs />
          </Route>
          <Route path="/addWriter">
            <AddWriter />
          </Route>
          <Route path="/addAdmin">
            <AddAdmin />
          </Route>
          <Route path="/addBlog">
             <AddBlog />
          </Route>
          <PrivetRoute path="/dashboard">
            <Dashboard />
          </PrivetRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
