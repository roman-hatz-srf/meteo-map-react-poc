import * as React from 'react';
import NavigationTab from './NavigationTab.js'


const Navigation = ({ names, urls }) => {
    console.log("Navigation render")
    // first tab is active on load
    const [activeTab, setActiveTab] = React.useState('0');
    const onClick = event => {
        setActiveTab(event.target.id);
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