import React from 'react';

import Header from './components/Header.js'
import Content from './components/Content.js'
import Footer from './components/Footer.js'
import './App.css';

const INDEX_JSON = 'https://www.srf.ch/static/meteo/map/generic/testData/testcases/poc-replace-europe/index.json';

const headerData = {
  title: "Title 1",
  tabs: ["Tab 1", "Tab 2", "Tab 3"]
}

let indexData;

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  
  
  React.useEffect(() => {
    setIsLoading(true);

    fetch(`${INDEX_JSON}`)
      .then(response => response.json())
      .then(result => {
        indexData = {
          title: result.title,
          tabs: result.tabs
        };
        setIsLoading(false);

      })
  }, []);

  //console.log("isLoading",isLoading)
  return (
    <>
    <h1>Step 4: Header and Navigation with remote data (index.json) and loading state</h1>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (<>
        <Header data={indexData} />
        <Content />
        <Footer />
      </>
      )}
     </>);
}



export default App;
