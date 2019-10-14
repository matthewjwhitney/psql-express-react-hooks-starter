import React, { useEffect, useContext } from 'react';
import history from './history';
import Context from './context';
import * as ACTIONS from '../store/actions/actions';
import axios from 'axios';

const AuthCheck = () => {
  const context = useContext(Context)

  const send_profile_to_db = (profile) => {
   const data = profile
   axios.post('/api/posts/userprofiletodb', data )
    .then(axios.get('/api/get/userprofilefromdb', {params: {email: profile.profile.email}})
      .then(res => context.handleAddDBProfile(res.data)) )
    }

  useEffect(() => {
    if(context.authObj.isAuthenticated()) {
      context.handleUserLogin()
      context.handleUserAddProfile(context.authObj.userProfile)
      send_profile_to_db(context.authObj.userProfile)
      history.replace('/')
    }
    else {
      context.handleUserLogout()
      context.handleUserRemoveProfile()
      history.replace('/')
      }
    }, [])

    return(
        <div>
        </div>
    )}




export default AuthCheck;
