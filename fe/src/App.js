import "./App.css";
import { Menu, Button, Header } from "semantic-ui-react";
import { Route, Routes, NavLink } from "react-router-dom";
import NewUser from "./Components/NewUser";
import ViewUser from "./Components/ViewUser";
import EditUser from "./Components/EditUser";
import Home from "./Components/Home";


function App() {
  return (
    <div className="App">
      <Menu>
        <Header as="h2">
          Inter Works
        </Header>
        <Menu.Menu position="right">
          <Menu.Item>
            <NavLink to="/new">
              <Button primary>Create User</Button>
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/view">
            <Button>View Users</Button>
            </NavLink>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/new" element={<NewUser />} />
        <Route path="/view" element={<ViewUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;
