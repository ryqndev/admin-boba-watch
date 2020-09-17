import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import AuthUserContext from './controller/contexts/AuthUserContext';
import firestore from './controller/libs/firestore';
import Login from './Pages/Login';
import Home from './Pages/Home';
import About from './Pages/About';
import './styles/main.scss';

const Start = ({history}) => {
    const [authUser, setAuthUser] = useState();
    useEffect(() => {
        firestore.init(user => {
            setAuthUser(user);
            history.push(user ? '/app' : '/login');
        });
        console.log("v2.0.6");
    }, [history]);

    return (
        <AuthUserContext.Provider value={[authUser]}> 
            <Switch>
                <Route exact path='/' />
                <Route path='/login' component={Login}/>
                <Route path='/app' component={App}/>
            </Switch>
        </AuthUserContext.Provider> 
    );
}
const Page = ({path, children}) => (
    <Route exact path={path}>
        {({ match }) => (
            <CSSTransition unmountOnExit mountOnEnter in={match != null} timeout={100} classNames="fade-quick">
                <div className="page with-user">
                    {children}
                </div>
            </CSSTransition>
        )}
    </Route>
);

const App = () => {
	return (
		<Router basename={process.env.PUBLIC_URL}>
			<Page path="/">
				<Home />
			</Page>
			<Page path="/about">
				<About />
			</Page>
		</Router>
	);
}

export default withRouter(Start);
