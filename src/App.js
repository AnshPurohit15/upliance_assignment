import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, AppBar, Toolbar, Button } from "@mui/material";
import Counter from "./components/Counter";
import UserForm from "./components/UserForm";
import RichTextEditor from "./components/RichTextEditor";

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/counter">Counter</Button>
          <Button color="inherit" component={Link} to="/form">User Form</Button>
          <Button color="inherit" component={Link} to="/editor">Rich Text Editor</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<h2>Welcome to the App</h2>} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/form" element={<UserForm />} />
          <Route path="/editor" element={<RichTextEditor />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
