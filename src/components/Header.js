import * as React from 'react';
import Title from './Title.js'
import Navigation from './Navigation.js'

const Header = (props) => {
    console.log("Header render")
    const { title, tabs } = props.headerData;
    
    return (
        <>
            <Navigation tabs={tabs} />
            <Title title={title} />
           
        </>
    )
}


export default Header;