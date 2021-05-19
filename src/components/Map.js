import * as React from 'react';
import CONFIG from '../config.json'
import { Context } from "../Context.js";

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const mapDataReducer = (state, action) => {
    switch (action.type) {
        case 'MAP_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'MAP_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case 'MAP_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        default:
            throw new Error("invalid action type: ", action.type);
    }
};

const Map = () => {
    console.log("Map render")
    const [mapData, dispatchMapData] = React.useReducer(mapDataReducer,
        { data: [], isLoading: true, isError: false }
    );
    const [context, setContext] = React.useContext(Context);

    React.useEffect(() => {
        dispatchMapData({ type: 'MAP_FETCH_INIT' });
        delay(CONFIG.delay)
            .then(() => fetch(`${context}`))
            .then(response => {
                return response.json()
            })
            .then(result => {
                dispatchMapData({
                    type: 'MAP_FETCH_SUCCESS', payload: {
                        serialized: JSON.stringify(result, undefined, 2)
                    },
                });
            })
            .catch((e) => {
                dispatchMapData({ type: 'MAP_FETCH_FAILURE' })
                console.error("fetch failed:", e)
            });
    }, [context]);

    return (
        <>
            {mapData.isError && <p>Error Loading Map Data</p>}
            {mapData.isLoading && <p>Loading Map Data ...</p>}
            {!mapData.isLoading && !mapData.isError ? (
                <pre>
                    {console.log("debug inline JSX", mapData) || mapData.data.serialized}
                </pre>
            ) : (<>

            </>
            )}
        </>);


}


export default Map;