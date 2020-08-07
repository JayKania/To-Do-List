import React from 'react';
import './App.css';

import ButtonAppBar from "./components/Appbar/Appbar";
import AllTasks from "./components/Tasks/AllTasks";
import UserProvider from "./firebase/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <ButtonAppBar />
        <AllTasks />
      </div>
    </UserProvider>
  );
}

export default App;
