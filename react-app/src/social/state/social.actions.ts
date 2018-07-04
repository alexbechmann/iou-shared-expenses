import * as Parse from 'parse';
import { store } from 'src/state';
import { FriendRequest } from '@iou/core';
import { User } from 'parse';
import {
  UserProperties,
  nameof,
  CLOUD_FUNCTION_FIND_FRIENDS_WITH_FACEBOOK_IDS,
  CLOUD_FUNCTION_SEND_FRIEND_REQUEST,
  CLOUD_FUNCTION_ACCEPT_FRIEND_REQUEST
} from '@iou/core';
import { createStandardAction, action } from 'typesafe-actions';
import { promiseAction } from 'src/state/promise-action';

export const FINDING_USERS = 'IOU/FINDING_USERS';
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

export const acceptingFriendRequest = createStandardAction(ACCEPTING_FRIEND_REQUEST)();

export function acceptFriendRequest(userId: string) {
  store.dispatch(acceptingFriendRequest());

  const params = {
    toUserId: userId
  };

  return promiseAction(ACCEPTED_FRIEND_REQUEST, Parse.Cloud.run(CLOUD_FUNCTION_ACCEPT_FRIEND_REQUEST, params));
}

export const setSearchText = createStandardAction(SET_SEARCH_TEXT)<string>();

export const findingUsers = createStandardAction(FINDING_USERS)();

export function findUsers(searchText: string) {
  const usernameQuery = new Parse.Query(User);
  usernameQuery.contains('username', searchText);

  const emailQuery = new Parse.Query(User);
  emailQuery.contains('email', searchText);

  store.dispatch(findingUsers());

  return promiseAction(FOUND_USERS, Parse.Query.or(usernameQuery, emailQuery).find());
}

export const sendingFriendRequest = (userId: string) => action(SENDING_FRIEND_REQUEST);

export function sendFriendRequest(userId: string) {
  store.dispatch(sendingFriendRequest(userId));

  const params = {
    toUserId: userId
  };

  return promiseAction(SENT_FRIEND_REQUEST, Parse.Cloud.run(CLOUD_FUNCTION_SEND_FRIEND_REQUEST, params), {
    id: userId
  });
}

export const gettingFriendRequests = createStandardAction(GETTING_FRIEND_REQUESTS)();

export function getFriendRequests(currentUserId: string) {
  store.dispatch(gettingFriendRequests());

  const query = new Parse.Query(FriendRequest);
  query.equalTo('toUser', {
    __type: 'Pointer',
    className: '_User',
    objectId: currentUserId
  });
  query.include('fromUser');

  return promiseAction(GET_FRIEND_REQUESTS, query.find());
}

export const gettingFriends = createStandardAction(GETTING_FRIENDS)();

export function getFriendsForUser(user: User) {
  store.dispatch(gettingFriends());

  const query = user.relation('friends').query();

  return promiseAction(GET_FRIENDS, query.find());
}

export const enrichingProfileDataWithFacebook = createStandardAction(ENRICHING_PROFILE_FACEBOOK)();

export function enrichUserProfileWithFacebook(currentUser: User) {
  store.dispatch(enrichingProfileDataWithFacebook());
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

  return promiseAction(ENRICHED_PROFILE_FACEBOOK, payload);
}

export const findingFriendsWithFacebook = createStandardAction(FINDING_FRIENDS_FACEBOOK)();

export function findFriendsWithFacebook(currentUser: User) {
  store.dispatch(findingFriendsWithFacebook());
  const payload = new Promise<any>((resolve, reject) =>
    FB.api('/me/friends', response => {
      if (response && response.data) {
        const ids = response.data.map(friend => friend.id);
        Parse.Cloud.run(CLOUD_FUNCTION_FIND_FRIENDS_WITH_FACEBOOK_IDS, { facebookIds: ids }).then(resolve);
      }
      resolve();
    })
  );
  return promiseAction(FOUND_FRIENDS_FACEBOOK, payload);
}
