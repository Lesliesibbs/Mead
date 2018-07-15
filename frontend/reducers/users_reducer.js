import { RECEIVE_CURRENT_USER } from '../actions/session_actions'
import { RECEIVE_USER, RECEIVE_ALL_USERS } from '../actions/user_actions'
import { RECEIVE_STORY, RECEIVE_ALL_STORIES } from '../actions/story_actions'
import { merge } from 'lodash'

export default (state = {}, action) => {
  Object.freeze(state)
  const newState = merge({}, state)

  switch (action.type) {
    case RECEIVE_USER:
      newState[action.payload.user.id] = action.payload.user
      return newState

    case RECEIVE_CURRENT_USER:
      newState[action.user.id] = action.user
      return newState

    case RECEIVE_ALL_USERS:
      return action.payload.users

    case RECEIVE_ALL_STORIES:
      return merge(newState, action.payload.users)

    case RECEIVE_STORY:
      return merge(newState, {[action.payload.user.id]: action.payload.user})

    default:
      return state
  }
}
