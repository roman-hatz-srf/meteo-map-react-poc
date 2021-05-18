import * as React from 'react';
import NavigationTab from './NavigationTab.js'



const Navigation = ({ tabs }) => {

    console.log("Navigation tans", tabs)
    const tabItems = tabs.map((tab, index) =>
        <NavigationTab key={"tab-" + tab} tab={tab} />
    );
    return (
        <ul>{tabItems}</ul>
    )
}


export default Navigation;