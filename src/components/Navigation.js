import * as React from 'react';
import NavigationTab from './NavigationTab.js'
import { Context } from "../Context.js";


const Navigation = ({ names, urls }) => {
    console.log("Navigation render")
    const [context, setContext] = React.useContext(Context);
    // first tab is active on load
    const [activeTab, setActiveTab] = React.useState('0');

    const onClick = event => {
        setActiveTab(event.target.id);
        setContext(urls[activeTab])
    };

    const tabItems = names.map((tab, index) =>
        <NavigationTab
            onClick={onClick}
            key={"tab-" + tab}
            tab={tab} id={index}
            activeTab={activeTab}
        />
    );
    return (
        <ul>{tabItems}</ul>
    )
}


export default Navigation;