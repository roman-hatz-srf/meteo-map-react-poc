import * as React from 'react';
import Title from './Title.js'
import Navigation from './Navigation.js'

const Header = (props) => {
    const { title, tabs } = props.headerData;
    
    return (
        <>
            <Title title={title} />
            <Navigation tabs={tabs} />
        </>
    )
}


export default Header;