import { User } from "parse";
import {
  SET_SEARCH_TEXT,
  FIND_USERS,
  FOUND_USERS,
  SENDING_FRIEND_REQUEST,
  SENT_FRIEND_REQUEST,
  ACCEPTING_FRIEND_REQUEST,
  ACCEPTED_FRIEND_REQUEST,
  GET_FRIEND_REQUESTS,
  GETTING_FRIEND_REQUESTS,
  SocialState
} from "src/social";
import { FriendRequest } from "@shared/schema";

const defaultState: SocialState = {
  searchText: "alexbechmann",
  searchResults: [],
  loading: false,
  sendingFriendRequests: [],
  acceptingFriendRequests: [],
  friendRequests: [],
  gettingFriendRequests: false
};

export function socialReducer(state: SocialState = defaultState, action: any) {
  switch (action.type) {
    case SET_SEARCH_TEXT: {
      const newState = Object.assign({}, state);
      newState.searchText = action.payload as string;
      return newState;
    }
    case FIND_USERS: {
      const newState = Object.assign({}, state);
      newState.loading = true;
      return newState;
    }
    case FOUND_USERS: {
      const newState = Object.assign({}, state);
      newState.searchResults = action.payload as User[];
      newState.loading = false;
      return newState;
    }
    case SENDING_FRIEND_REQUEST: {
      const newState = Object.assign({}, state);
      newState.sendingFriendRequests = Array.from(state.sendingFriendRequests)
        .filter(r => r !== action.payload)
        .concat([action.payload]);
      return newState;
    }
    case SENT_FRIEND_REQUEST: {
      const newState = Object.assign({}, state);
      newState.sendingFriendRequests = state.sendingFriendRequests.filter(r => r !== action.metadata.id);
      return newState;
    }
    case ACCEPTING_FRIEND_REQUEST: {
      const newState = Object.assign({}, state);
      newState.acceptingFriendRequests = Array.from(state.acceptingFriendRequests)
        .filter(r => r !== action.payload)
        .concat([action.payload]);
      return newState;
    }
    case ACCEPTED_FRIEND_REQUEST: {
      const newState = Object.assign({}, state);
      newState.acceptingFriendRequests = state.acceptingFriendRequests.filter(r => r !== action.metadata.id);
      newState.friendRequests = state.friendRequests.filter(r => r.toUser.objectId !== action.metadata.id);
      return newState;
    }
    case GETTING_FRIEND_REQUESTS: {
      const newState = Object.assign({}, state);
      newState.gettingFriendRequests = true;
      return newState;
    }
    case GET_FRIEND_REQUESTS: {
      const newState = Object.assign({}, state);
      newState.friendRequests = action.payload as FriendRequest[];
      newState.gettingFriendRequests = false;
      return newState;
    }
    default: {
      return state;
    }
  }
}
