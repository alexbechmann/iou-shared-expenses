import {
  SET_SEARCH_TEXT,
  FIND_USERS,
  FOUND_USERS,
  SENDING_FRIEND_REQUEST,
  SENT_FRIEND_REQUEST,
  ACCEPTING_FRIEND_REQUEST,
  ACCEPTED_FRIEND_REQUEST,
  GET_FRIEND_REQUESTS,
  GETTING_FRIEND_REQUESTS
} from 'src/social/state/social.actions';
import { GETTING_FRIENDS, GET_FRIENDS } from './state/social.actions';
import { User } from 'parse';
import * as Parse from 'parse';
import { SocialState } from 'src/social/state/social.state';
import { FriendRequest } from '@iou/core';

const defaultState: SocialState = {
  searchText: 'alexbechmann',
  searchResults: [],
  findingUsers: false,
  sendingFriendRequests: [],
  acceptingFriendRequests: [],
  friendRequests: [],
  gettingFriendRequests: false,
  friends: [],
  gettingFriends: false
};

export function socialReducer(state: SocialState = defaultState, action: any) {
  switch (action.type) {
    case SET_SEARCH_TEXT: {
      const newState: SocialState = Object.assign({}, state);
      newState.searchText = action.payload as string;
      return newState;
    }
    case FIND_USERS: {
      const newState: SocialState = Object.assign({}, state);
      newState.findingUsers = true;
      return newState;
    }
    case FOUND_USERS: {
      if (action.payload && !(action.payload instanceof Parse.Error)) {
        const newState: SocialState = Object.assign({}, state);
        newState.searchResults = action.payload as User[];
        newState.findingUsers = false;
        return newState;
      } else {
        return state;
      }
    }
    case SENDING_FRIEND_REQUEST: {
      const newState: SocialState = Object.assign({}, state);
      newState.sendingFriendRequests = Array.from(state.sendingFriendRequests)
        .filter(r => r !== action.payload)
        .concat([action.payload]);
      return newState;
    }
    case SENT_FRIEND_REQUEST: {
      if (action.payload && !(action.payload instanceof Parse.Error)) {
        const newState: SocialState = Object.assign({}, state);
        newState.sendingFriendRequests = state.sendingFriendRequests.filter(r => r !== action.metadata.id);
        return newState;
      } else {
        return state;
      }
    }
    case ACCEPTING_FRIEND_REQUEST: {
      if (action.payload && !(action.payload instanceof Parse.Error)) {
        const newState: SocialState = Object.assign({}, state);
        newState.acceptingFriendRequests = Array.from(state.acceptingFriendRequests)
          .filter(r => r !== action.payload)
          .concat([action.payload]);
        return newState;
      } else {
        return state;
      }
    }
    case ACCEPTED_FRIEND_REQUEST: {
      if (action.payload && !(action.payload instanceof Parse.Error)) {
        const newState: SocialState = Object.assign({}, state);
        newState.acceptingFriendRequests = state.acceptingFriendRequests.filter(r => r !== action.metadata.id);
        newState.friendRequests = state.friendRequests.filter(r => r.getFromUser().id !== action.metadata.id);
        return newState;
      } else {
        return state;
      }
    }
    case GETTING_FRIEND_REQUESTS: {
      const newState: SocialState = Object.assign({}, state);
      newState.gettingFriendRequests = true;
      return newState;
    }
    case GET_FRIEND_REQUESTS: {
      if (action.payload && !(action.payload instanceof Parse.Error)) {
        const newState: SocialState = Object.assign({}, state);
        newState.friendRequests = action.payload as FriendRequest[];
        newState.gettingFriendRequests = false;
        return newState;
      } else {
        return state;
      }
    }
    case GETTING_FRIENDS: {
      const newState: SocialState = Object.assign({}, state);
      newState.gettingFriends = true;
      return newState;
    }
    case GET_FRIENDS: {
      if (action.payload && !(action.payload instanceof Parse.Error)) {
        const newState: SocialState = Object.assign({}, state);
        newState.friends = action.payload as User[];
        newState.gettingFriends = false;
        return newState;
      } else {
        return state;
      }
    }
    default: {
      return state;
    }
  }
}
