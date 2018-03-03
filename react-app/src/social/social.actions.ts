import * as Parse from 'parse';
let parse = require('parse');
import { User } from 'parse';
import { store } from '@shared/state';
import { FriendRequest } from '@shared/schema';
import { AnyAction } from 'redux';

export const FIND_USERS = 'IOU/FIND_USERS';
export const FOUND_USERS = 'IOU/FOUND_USERS';
export const SET_SEARCH_TEXT = 'IOU/SET_SEARCH_TEXT';
export const SENDING_FRIEND_REQUEST = 'IOU/SENDING_FRIEND_REQUEST';
export const SENT_FRIEND_REQUEST = 'IOU/SENT_FRIEND_REQUEST';
export const ACCEPTING_FRIEND_REQUEST = 'IOU/ACCEPTING_FRIEND_REQUEST';
export const ACCEPTED_FRIEND_REQUEST = 'IOU/ACCEPTED_FRIEND_REQUEST';
export const GETTING_FRIEND_REQUESTS = 'IOU/GETTING_FRIEND_REQUESTS';
export const GET_FRIEND_REQUESTS = 'IOU/GET_FRIEND_REQUESTS';
export const GETTING_FRIENDS = 'IOU/GETTING_FRIENDS';
export const GET_FRIENDS = 'IOU/GET_FRIENDS';

export function acceptFriendRequest(userId: string): AnyAction {
  store.dispatch({
    type: ACCEPTING_FRIEND_REQUEST,
    payload: userId
  });

  const params = {
    toUserId: userId
  };

  return {
    type: ACCEPTED_FRIEND_REQUEST,
    payload: Parse.Cloud.run('acceptFriendRequest', params)
  };
}

export function setSearchText(searchText: string): AnyAction {
  return {
    type: SET_SEARCH_TEXT,
    payload: searchText
  };
}

export function findUsers(searchText: string): AnyAction {
  var usernameQuery = new Parse.Query(User);
  usernameQuery.contains('username', searchText);

  var emailQuery = new Parse.Query(User);
  emailQuery.contains('email', searchText);

  store.dispatch({
    type: FIND_USERS
  });

  return {
    type: FOUND_USERS,
    payload: Parse.Query.or(usernameQuery, emailQuery).find()
  };
}

export function sendFriendRequest(userId: string): AnyAction {
  store.dispatch({
    type: SENDING_FRIEND_REQUEST,
    payload: userId
  });

  const params = {
    toUserId: userId
  };

  return {
    type: SENT_FRIEND_REQUEST,
    payload: parse.Cloud.run('sendFriendRequest', params),
    metadata: {
      id: userId
    }
  };
}

export function getFriendRequests(currentUserId: string): AnyAction {
  store.dispatch({
    type: GETTING_FRIEND_REQUESTS
  });

  var query = new Parse.Query(FriendRequest);
  query.equalTo('toUser', {
    __type: 'Pointer',
    className: '_User',
    objectId: currentUserId
  });
  query.include('fromUser');

  return {
    type: GET_FRIEND_REQUESTS,
    payload: query.find()
  };
}

export function getFriends(currentUser: User): AnyAction {
  store.dispatch({
    type: GETTING_FRIENDS
  });

  const query = currentUser.relation('friends').query();

  return {
    type: GET_FRIENDS,
    payload: query.find()
  };
}
