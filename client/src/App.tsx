import React from 'react';
import {AppMain,AppBody,AppNavi} from'./styles';
import {Routes, Route} from 'react-router-dom';
import {Navigation} from "@/components/Menu";

function App() {
  return (
    <AppMain>

        {/*93% Body*/}
        <AppBody>


        </AppBody>

        {/*7% Navi*/}
        <AppNavi>

            <Navigation/>

        </AppNavi>
    </AppMain>
  );
}

export default App;
