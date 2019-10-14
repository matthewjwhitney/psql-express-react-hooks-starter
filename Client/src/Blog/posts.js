import React, { useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';
import * as ACTIONS from '../store/actions/actions';
import axios from 'axios';
import Context from '../utils/context';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/Table';
import TableCell from '@material-ui/core/Table';
import TableHead from '@material-ui/core/Table';
import TableRow from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';


const RenderPosts = post => (
  <TableRow>
    <TableCell>
      <Link to={{pathname: '/post/' + post.post.pid, state:{post} }}>
          <h4>{post.post.title}</h4>
      </Link>
      <br />
      <p>{post.post.body}</p>
    </TableCell>
  </TableRow>
)




const Posts = () => {
  const context = useContext(Context)

  useEffect(() => {
    axios.get('/api/get/allposts')
      .then(res => context.handleAddPosts(res.data))
      .catch((err) => console.log(err))
  }, [])


    return(
        <div>
        <br />
        <Link to="/addpost">
          <Button color="primary">
            Add Post
          </Button>
        </Link>

        <h1>Posts</h1>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Title
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {context.postsState
                  ? context.postsState.map(post =>
                    <RenderPosts key={post.pid} post={post} />
                   )
                   : null
                 }
              </TableBody>
            </Table>
          </Paper>
        </div>
    )}



export default Posts;
