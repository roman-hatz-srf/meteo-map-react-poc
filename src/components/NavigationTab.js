import * as React from 'react';



const NavigationTab = ({ tab, id, activeTab, onClick }) => {
    console.log("NavigationTab render")
    const classNames = activeTab == id ? "tabNavItem tabNavItem--active" : "tabNavItem"
 
    return (
        <li onClick={onClick} className={classNames} id={id}>{tab}</li>
    )
}


export default NavigationTab;