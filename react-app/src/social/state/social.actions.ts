import * as Parse from 'parse';
let parse = require('parse');
import { store } from 'src/state';
import { FriendRequest } from '@iou/core';
import { AnyAction } from 'redux';
import { User } from 'parse';
import {
  UserProperties,
  nameof,
  CLOUD_FUNCTION_FIND_FRIENDS_WITH_FACEBOOK_IDS,
  CLOUD_FUNCTION_SEND_FRIEND_REQUEST,
  CLOUD_FUNCTION_ACCEPT_FRIEND_REQUEST
} from '@iou/core';

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
export const ENRICHING_PROFILE_FACEBOOK = 'IOU/ENRICHING_PROFILE_FACEBOOK';
export const ENRICHED_PROFILE_FACEBOOK = 'IOU/ENRICHED_PROFILE_FACEBOOK';
export const FINDING_FRIENDS_FACEBOOK = 'IOU/FINDING_FRIENDS_FACEBOOK';
export const FOUND_FRIENDS_FACEBOOK = 'IOU/FOUND_FRIENDS_FACEBOOK';

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
    payload: Parse.Cloud.run(CLOUD_FUNCTION_ACCEPT_FRIEND_REQUEST, params)
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
    payload: parse.Cloud.run(CLOUD_FUNCTION_SEND_FRIEND_REQUEST, params),
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

export function getFriendsForUser(user: User): AnyAction {
  store.dispatch({
    type: GETTING_FRIENDS
  });

  const query = user.relation('friends').query();

  return {
    type: GET_FRIENDS,
    payload: query.find()
  };
}

export function enrichUserProfileWithFacebook(currentUser: User): AnyAction {
  store.dispatch({
    type: ENRICHING_PROFILE_FACEBOOK
  });
  const accessToken = currentUser.attributes.authData.access_token;
  const payload = new Promise<any>((resolve, reject) => {
    FB.api(
      '/me',
      {
        access_token: accessToken,
        fields: ['first_name', 'last_name']
      },
      (response: { first_name: string; last_name: string }) => {
        currentUser.set(nameof<UserProperties>('displayName'), `${response.first_name} ${response.last_name}`);
        currentUser.set(nameof<UserProperties>('facebookId'), currentUser.attributes.authData.facebook.id);
        currentUser.save().then(resolve);
      }
    );
  });

  return {
    type: ENRICHED_PROFILE_FACEBOOK,
    payload: payload
  };
}

export function findFriendsWithFacebook(currentUser: User): AnyAction {
  store.dispatch({
    type: FINDING_FRIENDS_FACEBOOK
  });
  const payload = new Promise<any>((resolve, reject) =>
    FB.api('/me/friends', response => {
      if (response && response.data) {
        const ids = response.data.map(friend => friend.id);
        Parse.Cloud.run(CLOUD_FUNCTION_FIND_FRIENDS_WITH_FACEBOOK_IDS, { facebookIds: ids }).then(resolve);
      }
      resolve();
    })
  );
  return {
    type: FOUND_FRIENDS_FACEBOOK,
    payload
  };
}
