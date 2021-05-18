import * as React from 'react';
import Title from './Title.js'
import Navigation from './Navigation.js'

const Header = (props) => {
    console.log("Header render", props)
    const { title, tabs } = props.data;
    const tabNames = tabs.map(a => a.name);
    const tabUrls = tabs.map(a => a.url);

    return (
        <>
            <Title title={title} />
            <Navigation names={tabNames} urls={tabUrls} />
        </>
    )
}


export default Header;