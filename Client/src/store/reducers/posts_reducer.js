import * as ACTION_TYPES from '../actions/action_types'

export const initialState = {
  posts: [],
  comments: [],
  user_posts: []
}

export const PostsReducer = (state = initialState, action) => {
    switch(action.type) {
      case ACTION_TYPES.FETCH_DB_POSTS:
        return {
          ...state,
          posts: action.payload
        }
      case ACTION_TYPES.REMOVE_DB_POSTS:
        return {
          ...state,
          posts: []
        }
      case ACTION_TYPES.FETCH_POST_COMMENTS:
        return {
          ...state,
          comments: action.payload
        }
      case ACTION_TYPES.REMOVE_POST_COMMENTS:
        return {
          ...state,
          comments: []
        }
      case ACTION_TYPES.FETCH_USER_POSTS:
        return {
          ...state,
          user_posts: action.payload
        }
      case ACTION_TYPES.REMOVE_USER_POSTS:
        return {
          ...state,
          user_posts: []
        }
      default:
        return state
    }
}
