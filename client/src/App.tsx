import React from 'react';
import {AppMain} from'./styles';
import {Routes, Route} from 'react-router-dom';
import LoginPage from "@/pages/LoginPage";
import UserRegist from "@/pages/UserRegist";
import {DiaryPage,DiaryWrite} from "@/components/Diary"
import {Diary} from "@/components/Diary/styles";
function App() {
  return (
    <AppMain>
      <DiaryWrite/>
        
    </AppMain>
  );
}

export default App;
