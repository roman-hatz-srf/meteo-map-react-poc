import React from 'react';

import Header from './components/Header.js'
import Content from './components/Content.js'
import Footer from './components/Footer.js'
import './App.css';

const INDEX_JSON = 'https://www.srf.ch/static/meteo/map/generic/testData/testcases/poc-replace-europe/index.json';
const BAD_INDEX_JSON = "'https://www.srf.ch/xxx"


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const indexDataReducer = (state, action) => {
  console.log("dispatch ", action.type)
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
  const [indexData, dispatchIndexData] = React.useReducer(indexDataReducer,
    { data: [], isLoading: true, isError: false }
  );

  React.useEffect(() => {
    dispatchIndexData({ type: 'INDEX_FETCH_INIT' });

    delay(1000)
      .then(() => fetch(`${BAD_INDEX_JSON}`))
      .then(response => {
        return response.json()
      })
      .then(result => {
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

  console.log("indexData", indexData)
  console.log("isError", indexData.isError)
  console.log("isLoading", indexData.isLoading)
  return (
    <>
      <h1>Step 6: Error state for index.json; useReducer() instead of useState()</h1>
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
    </>);
}



export default App;
