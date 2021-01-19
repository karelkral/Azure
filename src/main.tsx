import React from 'react';
import Layout from './Layouts/Layout';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainGrid from "./MainGrid/MainGrid";

function Main(){
    return(

        <>
            <Router>
                <Switch>
                    <Route path="/" component={Layout} exact />
                    <Route path="/main" component={MainGrid} exact />
                </Switch>
            </Router>
            
            
        </>

    );
}

export default Main;