import React from 'react';
import {AppMain} from'./styles';
import {Routes, Route} from 'react-router-dom';
import LoginPage from "@/pages/LoginPage/LoginPage";

function App() {
  return (
    <AppMain>
      <Routes>
          <Route path={"/"} element={<LoginPage/>}/>
      </Routes>
        
    </AppMain>
  );
}

export default App;
