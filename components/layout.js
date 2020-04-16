import Head from "next/head";
import React from "react";

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD',
    overflow: "scroll",
    height:"100%"
};

const Layout = props => (
    <div style={layoutStyle}>
        <Head>
            <title>Compare Corona Statistics by Country</title>
            <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"/>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"/>
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"/>
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-12370199-5"/>
        </Head>
        {props.children}
    </div>
);

export default Layout;
