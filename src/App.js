import React from 'react';

import Header from './components/Header.js'
import Content from './components/Content.js'
import Footer from './components/Footer.js'
import './App.css';

const headerData = {
  title: "Title 1",
  tabs: ["Tab 1", "Tab 2", "Tab 3"]
}
 
const App = () => {
  return (
    <>
     <h1>Step 4: Navigation Tabs with Active State</h1>

     <Header headerData={headerData}/>
     <Content/>
     <Footer/>      
    </>
  );
}

 

export default App;
