import React from 'react';
import HomePage from './HomePage'
import SelectPhotoPage from './SelectPhoto'
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom'

export default function App() {
    return (
        <main>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/Home" exact component={HomePage} />
                <Route path="/SelectPhotos" exact component={HomePage} />
            </Switch>
        </main>
    )
}
