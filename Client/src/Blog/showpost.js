import React, { useContext, useState, useEffect } from 'react';

import * as ACTIONS from '../store/actions/actions';
import axios from 'axios';
import history from '../utils/history';
import Context from '../utils/context';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';




const ShowPost = (props) => {
  const context = useContext(Context)

  const [stateLocal, setState] = useState({  open: false,
                                             comment: '',
                                             cid: ''
                                           })

  useEffect(() => {
    axios.get('/api/get/allpostcomments', {params: {post_id: props.location.state.post.post.pid}} )
      .then(res => context.handleAddComments(res.data))
      .catch((err) => console.log(err))
  })

  const RenderComments = (comment) => (
    <div>
      <h3> {comment.comment.comment} </h3>
      <small>{comment.comment.date_created}</small>
      <p> By: { comment.comment.author} </p>
      {comment.cur_user_id === comment.comment.user_id
        ? <Button onClick={() => this.handleClickOpen(comment.comment.cid, comment.comment.comment)}>
            Edit
          </Button>
        : null
      }
    </div>
  )



  const handleClickOpen = (cid, comment) => (
    setState({ open: true, comment: comment, cid: cid})
  );

  const handleClose = () => (
    setState({open: false, comment: '', cid: '' })
  )

  const handleCommentChange = (event) => (
    setState({comment: event.target.value})
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    const user_id = context.dbProfileState[0].uid
    const username = context.dbProfileState[0].username
    const post_id = props.location.state.post.post.pid

    const data = {comment: event.target.comment.value,
                  post_id: post_id,
                  user_id: user_id,
                  username: username}

    axios.post('/api/post/commenttodb', data)
      .then(res => console.log(res))
      .catch((err) => console.log(err))
      .then(setTimeout(() => history.replace('/posts'), 700 ))
  }

  const handleUpdate = () => {
    const comment = stateLocal.comment
    const cid = stateLocal.cid

    const post_id = props.location.state.post.post.pid
    const user_id = context.dbProfileState[0].uid
    const username = context.dbProfileState[0].username

    const data = {cid: cid,
                  comment: comment,
                  post_id: post_id,
                  user_id: user_id,
                  username: username}

    axios.put('/api/put/commenttodb', data)
      .then(res => console.log(res))
      .catch((err) => console.log(err))
      .then(setTimeout(() => history.replace('/posts'), 700 ))
  }

  const handleDeleteComment = () => {
    const cid = stateLocal.cid
    axios.delete('/api/delete/comment', {data: {cid: cid}} )
    .then(res => console.log(res))
    .catch((err) => console.log(err))
    .then(setTimeout(() => history.replace('/posts'), 700 ))

  }


    return(
        <div>
          <div>
            <h2>Post</h2>
              <h4>{props.location.state.post.post.title}</h4>
              <p>{props.location.state.post.post.body}</p>
              <p>{props.location.state.post.post.author}</p>
          </div>
          <div>
            <h2> Comments:</h2>
            {context.commentsState
              ? context.commentsState.map(comment =>
                 <RenderComments comment={comment}
                                 cur_user_id={context.dbProfileState[0].uid}
                                 key={comment.cid} />)
                  : null
            }
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <TextField
                id="comment"
                label="Comment"
                margin="normal"
              />
              <br />
              <Button type="submit"> Submit</Button>
            </form>
          </div>
          <div>
            <Dialog
              open={stateLocal.open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Edit Comment</DialogTitle>
                <DialogContent>
                  <DialogContentText
                    id="alert-dialog-description"
                    >
                    <input type="text" value={stateLocal.comment} onChange={handleCommentChange}/>
                    </DialogContentText>
                    <DialogActions>
                      <Button onClick={() => {handleUpdate(); setState({open: false})} }>
                         Agree
                      </Button>
                      <Button onClick={() => handleClose()}>
                       Cancel
                      </Button>
                      <Button onClick={() => handleDeleteComment()}>
                        Delete
                      </Button>
                  </DialogActions>
                </DialogContent>
            </Dialog>
          </div>
        </div>
    )}




export default ShowPost;
