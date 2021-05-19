import React from 'react';

import Header from './components/Header.js'
import Content from './components/Content.js'
import Footer from './components/Footer.js'
import { Context } from "./Context.js";
import CONFIG from './config.json'

import './App.css';

const INDEX_JSON = 'https://www.srf.ch/static/meteo/map/generic/testData/testcases/ch-prognose/ch-prognose.index.json';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const indexDataReducer = (state, action) => {
  switch (action.type) {
    case 'INDEX_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'INDEX_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'INDEX_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    default:
      throw new Error("invalid action type: ", action.type);
  }
};

const App = () => {
  const [context, setContext] = React.useState();

  const [indexData, dispatchIndexData] = React.useReducer(indexDataReducer,
    { data: [], isLoading: true, isError: false }
  );

  React.useEffect(() => {
    dispatchIndexData({ type: 'INDEX_FETCH_INIT' });

    delay(CONFIG.delay)
      .then(() => fetch(`${INDEX_JSON}`))
      .then(response => {
        return response.json()
      })
      .then(result => {
        setContext(result.tabs[0].url);
        dispatchIndexData({
          type: 'INDEX_FETCH_SUCCESS', payload: {
            title: result.title,
            tabs: result.tabs
          },
        });
      })
      .catch((e) => {
        dispatchIndexData({ type: 'INDEX_FETCH_FAILURE' })
        console.error("fetch failed:", e)
      });
  }, []);


  return (
    <Context.Provider value={[context, setContext]}>
      <h1>Step 7: Render Map Data with setContext()</h1>
      <h3>Click Bergwetter</h3>
      {indexData.isError && <p>Error Loading Index Data</p>}
      {indexData.isLoading && <p>Loading Index Data ...</p>}
      {!indexData.isLoading && !indexData.isError ? (
        <>
          <Header data={indexData.data} />
          <Content />
          <Footer />
        </>
      ) : (<>

      </>
      )}
    </Context.Provider>);
}



export default App;
