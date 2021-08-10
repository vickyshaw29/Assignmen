import React from 'react'
import Header from './components/ui/Header'
import { Route, Switch } from 'react-router-dom'
import Homepage from './components/ui/Homepage'
import UserDetails from './components/ui/UserDetails'

const MainRouter = () => {
    return (
        <>
            <Header />
            <Switch>
                <Route exact path='/' component={Homepage}/>
                <Route exact path='/details/:id' component={UserDetails}/>
            </Switch>   
        </>
    )
}

export default MainRouter