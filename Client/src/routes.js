import React, { useContext, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import history from './utils/history';
import Context from './utils/context';
import AuthCheck from './utils/authcheck';

import Home from './hooks/home';
import Header from './hooks/header';
import HooksContainer1 from './hooks/hook1';
import Callback from './hooks/callback';
import HooksForm from './hooks/hooks_form1';
import PrivateComponent from './hooks/privatecomponent';
import Profile from './hooks/profile';

import Posts from './Blog/posts';
import AddPost from './Blog/addpost';
import ShowPost from './Blog/showpost';
import EditPost from './Blog/editpost';

const PrivateRoute = ({component: Component, auth }) => (
  <Route render={props => auth === true
    ? <Component auth={auth} {...props} />
    : <Redirect to={{pathname:'/'}} />
  }
  />
)



const Routes = () => {
    const context = useContext(Context)

    useEffect(() => {
      if(context.authObj.isAuthenticated()) {
        context.handleUserLogin()
        context.authObj.getProfile()
        setTimeout(() => context.handleUserAddProfile(context.authObj.userProfile), 400)
      }
      else {
        context.handleUserLogout()
        context.handleUserRemoveProfile()
      }
    }, [])

      return(
        <div>
          <Router history={history} >
          <Header />
          <br />
          <br />
          <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/hooksform' component={HooksForm} />
              <Route path='/profile' component={Profile} />
              <Route path='/hookscontainer' component={HooksContainer1} />
              <Route path='/authcheck' component={AuthCheck} />

              <Route path='/posts' component={Posts} />
              <Route path='/post/:pid' component={ShowPost} />
              <Route path='/editpost/:pid' component={EditPost} />
              <Route path='/addpost' component={AddPost} />

              <PrivateRoute path='/privateroute'
                            auth={context.authState}
                            component={PrivateComponent} />
              <PrivateRoute path="/profile"
                            auth={context.authState}
                            component={Profile} />
              <Route path='/callback' render={(props) => { context.handleAuth(props);
                                                            return <Callback />}} />


            </Switch>
          </div>
          </Router>
        </div>
  )}



export default Routes;
