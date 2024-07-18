import React from "react";
import {
  Container,
} from "@mui/material";
import {Routes, Route} from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {

  const clientID = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientID}>
      <Container maxWidth="lg">
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' exact element={<Home />}/>
          <Route path='/auth' exact element={<Auth />}/>
        </Routes>
      </Container>
    </GoogleOAuthProvider>
  );
}

export default App;
