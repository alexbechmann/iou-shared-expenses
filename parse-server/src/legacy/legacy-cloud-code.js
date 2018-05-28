var _ = require('underscore');
console.log('Using legacy cloud code');

function formatAsGBP(amount){

    return "£" + amount.toFixed(2);
}

var asyncLoop = function(o){
    var i=-1;

    var loop = function(){
        i++;
        if(i==o.length){o.callback(); return;}
        o.functionToLoop(loop, i);
    }
    loop();//init
}

//Parse.Cloud.define("DifferenceBetweenActiveUserFromUsers", function(request, response) {
//
//    Parse.Cloud.useMasterKey();
//
//    var rc = {}
//    var userIds = request.params.ids;
//
//    asyncLoop({
//        length : userIds.length,
//        functionToLoop : function(loop, i) {
//
//            var friendId = userIds[i];
//
//            differenceBetweenActiveUser(friendId, function(difference) {
//
//                rc[friendId] = difference;
//                loop();
//            });
//        },
//        callback : function(){
//
//            response.success(rc);
//        }
//    });
//});

//Parse.Cloud.define("DifferenceBetweenActiveUser", function(request, response) {
//
//    var friendId = request.params.compareUserId;
//
//    differenceBetweenActiveUser(friendId, function(difference){
//
//        response.success(difference);
//    });
//});
//
//function differenceBetweenActiveUser(friendId, completion) {
//
//    Parse.Cloud.useMasterKey(); // necessary?
//
//    var currentUser = Parse.User.current();
//    var difference = 0;
//
//    var transactionsFromCurrentQuery = new Parse.Query("Transaction");
//    transactionsFromCurrentQuery.equalTo("fromUser", currentUser);
//    transactionsFromCurrentQuery.equalTo("toUser", {
//        __type: "Pointer",
//        className: "_User",
//        objectId: friendId
//    });
//
//    var transactionsFromFriendQuery = new Parse.Query("Transaction");
//    transactionsFromFriendQuery.equalTo("fromUser", {
//        __type: "Pointer",
//        className: "_User",
//        objectId: friendId
//    });
//    transactionsFromFriendQuery.equalTo("toUser", currentUser);
//
//    Parse.Query.or(transactionsFromCurrentQuery, transactionsFromFriendQuery).find().then(function(results) {
//
//        //calculate amount
//
//        for (var index = 0; index < results.length; index++) {
//            var transaction = results[index];
//
//            if (transaction.get("fromUser").id == currentUser.id) {
//
//                difference += transaction.get("amount");
//            }
//            else{
//                difference -= transaction.get("amount");
//
//            }
//        }
//
//        completion(difference);
//	});
//}

function NewUserWithId(id){
	return new Parse.User({id:id});
}

function differenceBetweenActiveUserWithMultipleCurrencies(currentUserId, friendId, completion) {

    //Parse.Cloud.useMasterKey(); // necessary?

    var difference = {};

    difference[0] = 0;
    difference[1] = 0;
    difference[2] = 0;
    difference[3] = 0;

    var transactionsFromCurrentQuery = new Parse.Query("Transaction");
    transactionsFromCurrentQuery.equalTo("fromUser", {
        __type: "Pointer",
        className: "_User",
        objectId: currentUserId
    });
    transactionsFromCurrentQuery.equalTo("toUser", {
        __type: "Pointer",
        className: "_User",
        objectId: friendId
    });

    var transactionsFromFriendQuery = new Parse.Query("Transaction");
    transactionsFromFriendQuery.equalTo("fromUser", {
        __type: "Pointer",
        className: "_User",
        objectId: friendId
    });
    transactionsFromFriendQuery.equalTo("toUser", {
        __type: "Pointer",
        className: "_User",
        objectId: currentUserId
    });

    Parse.Query.or(transactionsFromCurrentQuery, transactionsFromFriendQuery).find().then(function(results) {
		console.log('hi' + results.length)
        //calculate amount
        //console.log('calculating diff for currentUser: ' + currentUserId + ', friend: ' + friendId);
        //console.log(results);
        //console.log('currency: ' + transaction.get("currencyId") + ' amount:' + transaction.get("amount") + 'fromuser:')
        //console.log(transaction.get("fromUser"));
        for (var index = 0; index < results.length; index++) {
            var transaction = results[index];
            var currencyId = transaction.get("currencyId")

            if (typeof currencyId === 'undefined') {

                currencyId = 0;
            }

            if (transaction.get("fromUser").id == currentUserId) {
                //console.log('a')
                difference[currencyId] += transaction.get("amount");
            }
            else{
                //console.log('b');
                difference[currencyId] -= transaction.get("amount");
            }

            console.log('diff' + difference[currencyId]);
        }


        //console.log('done calculating diff for currentUser: ' + currentUserId + ', friend: ' + friendId);

        completion(difference);
	});
}

Parse.Cloud.define("DifferenceBetweenActiveUserFromUsersWithMultipleCurrenciesv2", function(request, response) {

    //Parse.Cloud.useMasterKey();

    var rc = {}
    console.log(request.params);
    var userIds = request.params.ids;
	var currentUserId = request.params.currentUserId;
    console.log("http://sharedexpensespatchweb20161219093029.azurewebsites.net/iou/OwesAll?fromUserId=" + currentUserId + "&friendIds=" + userIds.join());
    Parse.Cloud.httpRequest({
        url: "http://sharedexpensespatchweb20161219093029.azurewebsites.net/iou/OwesAll?fromUserId=" + currentUserId + "&friendIds=" + userIds.join()
    }).then(function(httpResponse) {
        var rc = JSON.parse(httpResponse.text);
        response.success(rc);
    },function(httpResponse) {
        // error
        response.error("something went wrong")
    });

    // asyncLoop({
    //     length : userIds.length,
    //     functionToLoop : function(loop, i) {

    //         var friendId = userIds[i];

    //         differenceBetweenActiveUserWithMultipleCurrencies(currentUserId, friendId, function(difference) {

    //             rc[friendId] = difference;
    //             loop();
    //         });
    //     },
    //     callback : function(){

    //         response.success(rc);
    //     }
    // });
});

Parse.Cloud.define("DifferenceBetweenActiveUserWithMultipleCurrenciesv2", function(request, response) {

    var friendId = request.params.compareUserId;
	var currentUserId = request.params.currentUserId;

    Parse.Cloud.httpRequest({
        url: "http://sharedexpensespatchweb20161219093029.azurewebsites.net/iou/owesfriend?fromUserId=" + currentUserId + "&toUserId=" + friendId
    }).then(function(httpResponse) {
        var difference = JSON.parse(httpResponse.text);
        response.success(difference);
    },function(httpResponse) {
        // error
        response.error("something went wrong")
    });

    // differenceBetweenActiveUserWithMultipleCurrencies(currentUserId, friendId, function(difference){

    //     response.success(difference);
    // });
});

Parse.Cloud.define("DifferenceBetweenActiveUserFromUsersWithMultipleCurrencies", function(request, response) {

    Parse.Cloud.useMasterKey();

    var rc = {}
    var userIds = request.params.ids;
	var currentUserId = request.user.id;

    asyncLoop({
        length : userIds.length,
        functionToLoop : function(loop, i) {

            var friendId = userIds[i];

            differenceBetweenActiveUserWithMultipleCurrencies(currentUserId, friendId, function(difference) {

                rc[friendId] = difference;
                loop();
            });
        },
        callback : function(){

            response.success(rc);
        }
    });
});

Parse.Cloud.define("DifferenceBetweenActiveUserWithMultipleCurrencies", function(request, response) {

    var friendId = request.params.compareUserId;
	var currentUserId = request.user.id;

    differenceBetweenActiveUserWithMultipleCurrencies(currentUserId, friendId, function(difference){

        response.success(difference);
    });
});

Parse.Cloud.afterSave("Transaction", function(request) {

    Parse.Cloud.useMasterKey();

    var fromUser = request.object.get("fromUser");
    var toUser = request.object.get("toUser");

    var isSecure = request.object.get("isSecure");
    if (typeof isSecure === 'undefined') { isSecure = false };

    var fromUserId = request.object.get("fromUser").id;
    var toUserId = request.object.get("toUser").id;
    var amount = request.object.get("amount");
    var currentUser = request.user;
    var currentUserId = currentUser.id;
    var User = Parse.Object.extend("_User");
    var userQuery = new Parse.Query(User);
    var transactionType = request.object.get("transactionType");

    if (fromUserId != toUserId) {

        var fromUserQuery = new Parse.Query(Parse.Installation);
        fromUserQuery.equalTo("user", {
            __type: "Pointer",
            className: "_User",
            objectId: request.object.get("fromUser").id
        });

        userQuery.get(fromUserId, {
            success: function(user) {

                var message1 = "";

                if (transactionType == 1) { // payment

                    message1 = appropriateDisplayName(user) + " paid you";
                }
                else {

                    message1 = "You owe " + appropriateDisplayName(user);
                }

                var fullMessage1 = (message1 + " " + formatAmountWithCurrencyId(request.object.get("currencyId"), amount) + " for \"" + request.object.get("title") + "\"")

                if (isSecure) {

                    fullMessage1 = message1 + " for a secret transaction!";
                }

                sendPushNotificationTo(request, toUserQuery, fullMessage1, "ItemSaved", "PresentTransaction", request.object.id);
            },
            error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
            }
        });

        var toUserQuery = new Parse.Query(Parse.Installation);
        toUserQuery.equalTo("user", {
            __type: "Pointer",
            className: "_User",
            objectId: request.object.get("toUser").id
        });

        userQuery.get(toUserId, {
            success: function(user) {

                var message2 = "";

                if (transactionType == 1) { // payment

                    message2 = "You paid " + appropriateDisplayName(user);
                }
                else {

                    message2 = appropriateDisplayName(user) + " owes you";
                }

                var fullMessage2 = (message2 + " " + formatAmountWithCurrencyId(request.object.get("currencyId"), amount) + " for \"" + request.object.get("title") + "\"");

                if (isSecure) {

                    fullMessage2 = message2 + " for a secret transaction!";
                }

                sendPushNotificationTo(request, fromUserQuery, fullMessage2, "ItemSaved", "PresentTransaction", request.object.id);
            },
            error: function(object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
            }
        });
    }
});

function appropriateDisplayName(user) {

    var rc = "";

    var usedDisplayName = false;

    if(typeof user.get("displayName") !== 'undefined') {

        if(user.get("displayName").length > 0) {

            rc = user.get("displayName");
            usedDisplayName = true;
        }
    }

    if (!usedDisplayName) {

        rc = user.get("username");
    }

    return rc;
}

Parse.Cloud.beforeDelete("Transaction", function(request, response) {

    response.success();

    Parse.Cloud.useMasterKey();

    var fromUserQuery = new Parse.Query(Parse.Installation);
    fromUserQuery.equalTo("user", {
        __type: "Pointer",
        className: "_User",
        objectId: request.object.get("fromUser").id
    });

    var toUserQuery = new Parse.Query(Parse.Installation);
    //toUserQuery.equalTo("user", request.object.get("toUser"))
    toUserQuery.equalTo("user", {
        __type: "Pointer",
        className: "_User",
        objectId: request.object.get("toUser").id
    });

    var query = Parse.Query.or(fromUserQuery, toUserQuery);
    var currentUser = request.user;
    var amount = request.object.get("amount")

    //(" + request.object.get("amount") + ")
    sendPushNotificationTo(request, query, ("\"" + request.object.get("title") + "\" (" + formatAmountWithCurrencyId(request.object.get("currencyId"), amount) + ") deleted by " + appropriateDisplayName(currentUser)), "ItemSaved", ""); //for ÃÂ£" + request.object.get("amount").toFixed(2) + ",
});

function sendPushNotificationTo(request, installationQuery, message, event, command, objectId){

      Parse.Cloud.useMasterKey();

      var currentUserId = "";

      if(request.user) {

          currentUserId = request.user.id;
      }

      console.log("uid3 " + currentUserId)

      Parse.Push.send({
          where: installationQuery,
          data: {
            alert: message, //("Payment from" + fromUser.get("displayName") + " to " + toUser.get("displayName") + " saved."),
            sound: "Default",
            iouEvent: event,
            objectId: emptyIfNull(objectId),
            iouCommand: emptyIfNull(command),
            currentUserId: currentUserId,
            message: message
          }
        }, { useMasterKey: true })
        .then(function() {
          // Push sent!
          console.log("success");
        }, function(error) {
          // There was a problem :(
          console.log(error);
        });

//    Parse.Push.send({
//      where: installationQuery, // Set our Installation query
//      data: {
//        alert: message, //("Payment from" + fromUser.get("displayName") + " to " + toUser.get("displayName") + " saved."),
//        sound: "Default",
//        iouEvent: event,
//        objectId: emptyIfNull(objectId),
//        iouCommand: emptyIfNull(command),
//        currentUserId: currentUserId,
//        message: message
//      }
//    }, {
//      success: function() {
//        // Push was successful
//        console.log("success");
//      },
//      error: function(error) {
//        // Handle error
//        console.log(error);
//      }
//    });
}

function emptyIfNull(str) {

    return typeof str === 'undefined' ? "" : str;
}

// function emptyIdForObjectIfNull(obj) {

//     var rc = "";

//     if (obj) {

//         rc = obj.id + "";
//     }

//     return rc;
// }

function removeFriendsFromBothFriendsLists(fromUserId, toUserID, completion) {

    var toUser = "";
    var fromUser = "";

    getObjectById(fromUserId, "_User", function(obj){
        console.log(obj);
        fromUser = obj;

        getObjectById(toUserID, function(obj){

            toUser = obj;

            // CONTINUE
            var toUserFriends = toUser.relation("friends");
            var fromUserFriends = fromUser.relation("friends");
            toUserFriends.remove(fromUser);
            fromUserFriends.remove(toUser);

            fromUser.save(null, {
                useMasterKey: true,
                success: function() {

                    toUser.save(null, {
                        useMasterKey: true,
                        success: function() {
                            console.log("hi1");
                            completion(true);
                        },
                        error: function(err) { completion(false); }
                    });
                 },
                error: function(err) {  completion(false); }
            });
        })
    })
}

function addFriendsToBothFriendsLists(fromUserId, toUserID, completion) {

    var toUser = "";
    var fromUser = "";

    getObjectById(fromUserId, "_User", function(obj){

        fromUser = obj;

        getObjectById(toUserID, function(obj){

            toUser = obj;

            // CONTINUE
            var toUserFriends = toUser.relation("friends");
            var fromUserFriends = fromUser.relation("friends");
            toUserFriends.remove(fromUser);
            fromUserFriends.remove(toUser);

            fromUser.save(null, {
                useMasterKey: true,
                success: function() {

                    toUser.save(null, {
                        useMasterKey: true,
                        success: function() {

                            completion(true);
                        },
                        error: function(err) { console.log("Error saving toUser, " + err.code); completion(false); }
                    });
                 },
                error: function(err) { console.log("Error saving fromUser, " + err.code); completion(false); }
            });
        })
    })
}

// Parse.Cloud.define("RemoveFriend", function(request, response){

//      Parse.Cloud.useMasterKey();

//     var fromUserId = request.params.fromUserId;
//     var toUserId = request.params.toUserId;

//     removeFriendsFromBothFriendsLists(fromUserId, toUserId, function(success){

//         if(success){

//             response.success(success);
//         }
//         else{

//             response.error("Something went wrong.5");
//         }
//     })

//     response.success(true);
// });

// Parse.Cloud.define("AddFriend", function(request, response) {

//      Parse.Cloud.useMasterKey();

//     var kFriendRequestPending = 1;
//     var fromUserId = request.params.fromUserId;
//     var toUserId = request.params.toUserId;

//     var query1 = new Parse.Query("FriendRequest");
//     query1.equalTo("fromUser", pointerTo(fromUserId, "_User"));
//     query1.equalTo("toUser", pointerTo(toUserId, "_User"));

//     var query2 = new Parse.Query("FriendRequest");
//     query2.equalTo("toUser", pointerTo(fromUserId, "_User"));
//     query2.equalTo("fromUser", pointerTo(toUserId, "_User"));

//     var checkIfFriendRequestExistsQuery = Parse.Query.or(query1, query2)

//     checkIfFriendRequestExistsQuery.first({
//         success: function(friendRequest) {
//             console.log(friendRequest);
//             if (typeof friendRequest === 'undefined') {

//                 // CREATE ONE

//                 deleteAllFriendRequests(fromUserId, toUserId, function(){

//                     saveFriendRequestBetween(fromUserId, toUserId, 1, function(success) {

//                         if(success){

//                              response.success(success);
//                         }
//                         else{

//                             response.error("Something went wrong1.");
//                         }
//                     });
//                 })
//             }
//             else {

//                 var status = friendRequest.id;

//                 if (status == kFriendRequestPending) {

//                     // ACCEPT THE REQUEST

//                     deleteAllFriendRequests(fromUserId, toUserId, function(){

//                         addFriendsToBothFriendsLists(fromUserId, toUserId, function(success){

//                             if(success){

//                                  response.success(success);
//                             }
//                             else{

//                                 response.error("Something went wrong2.");
//                             }
//                         });
//                     })
//                 }
//             }
//         },
//         error: function(error) {

//             // CREATE ONE

//             deleteAllFriendRequests(fromUserId, toUserId, function(){

//                 saveFriendRequestBetween(fromUserId, toUserId, 1, function(success) {

//                     if(success){

//                          response.success(success);
//                     }
//                     else{

//                         response.error("Something went wrong1.");
//                     }
//                 });
//             })
//         }
//     });

//     response.success(true);
// });

function getObjectById(id, className, completion){

    var rc = "";

    query = new Parse.Query(className);
    query.get( id, {

        success: function(object) {

            completion(object);
        }
    });
}

    // checkIfFriendRequestExistsQuery.count(
    // {
    //     success: function(count)
    //     {
    //         // Change it to accept request
    //     },
    //     error: function(error) {

    //         // create friend request
    //     }
    // });


Parse.Cloud.afterSave("FriendRequest", function(request, response) {
    var toUserId = request.object.get("toUser").id;
    var fromUserId = request.object.get("fromUser").id;
    var toUser = null;
    var fromUser = null;

    var status = request.object.get("friendRequestStatus");

    if (status === 2) {

        Parse.Cloud.useMasterKey();

        query = new Parse.Query("User");
        query.get( fromUserId, {

            success: function(_fromUser) {
            fromUser = _fromUser;
            var queryTo = new Parse.Query("User");
            queryTo.get( toUserId, {
                success: function(_toUser) {
                toUser = _toUser;

                var toUserFriends = toUser.relation("friends");
                var fromUserFriends = fromUser.relation("friends");
                toUserFriends.add(fromUser);
                fromUserFriends.add(toUser);

                fromUser.save(null, {
                    useMasterKey: true,
                    success: function() { console.log("Saved fromUser"); },
                    error: function(err) { console.log("Error saving fromUser, " + err.code); }
                });

                toUser.save(null, {
                    useMasterKey: true,
                    success: function() { console.log("Saved toUser"); },
                    error: function(err) { console.log("Error saving toUser, " + err.code); }
                });

                //remove requests
                var requestQuery1 = new Parse.Query("FriendRequest")
                requestQuery1.equalTo("fromUser", fromUser)
                requestQuery1.equalTo("toUser", toUser)

                var requestQuery2 = new Parse.Query("FriendRequest")
                requestQuery2.equalTo("fromUser", toUser)
                requestQuery2.equalTo("toUser", fromUser)

                requestQuery1.find().then(function(results) {
                    return Parse.Object.destroyAll(results);
                }).then(function() {
                    console.log("deleted a row")
                }, function(error) {
                    console.log(error)
                });

                requestQuery2.find().then(function(results) {
                    return Parse.Object.destroyAll(results);
                }).then(function() {
                    console.log("deleted a row")
                }, function(error) {
                    console.log(error)
                });

                // NOTIFICATION
                var installationQuery = new Parse.Query(Parse.Installation);
                installationQuery.equalTo("user", pointerTo(fromUserId, "_User"));
                sendPushNotificationTo(request, installationQuery, "Friend request accepted by " + appropriateDisplayName(toUser), "InviteEvent", "", "")
                //

                },
                error: function(error) {
                    console.log("Error retrieving user in query!");
                }

                });
            },
            error: function(error) {
                console.log("Error retrieving user in query!");
            }
        });

    }
    else if (status === 1 ) {

        // NOTIFICATION
        getObjectById(fromUserId, "_User", function(user){

            fromUser = user;

            // NOTIFICATION
            var installationQuery = new Parse.Query(Parse.Installation);
            installationQuery.equalTo("user", pointerTo(toUserId, "_User"));
            sendPushNotificationTo(request, installationQuery, "Friend request from " + appropriateDisplayName(fromUser), "InviteEvent", "PresentInvites", "")
            //
        })
    }

     else if (status === 3) {

        Parse.Cloud.useMasterKey();

        query = new Parse.Query("User");
        query.get( fromUserId,
        {
            success: function(_fromUser) {
            fromUser = _fromUser;
            var queryTo = new Parse.Query("User");
            queryTo.get( toUserId, {
            success: function(_toUser) {
                toUser = _toUser;

                var toUserFriends = toUser.relation("friends");
                var fromUserFriends = fromUser.relation("friends");
                toUserFriends.remove(fromUser);
                fromUserFriends.remove(toUser);

                fromUser.save(null, {
                    useMasterKey: true,
                    success: function() { console.log("Saved fromUser"); },
                    error: function(err) { console.log("Error saving fromUser, " + err.code); }
                });

                toUser.save(null, {
                    useMasterKey: true,
                    success: function() { console.log("Saved toUser"); },
                    error: function(err) { console.log("Error saving toUser, " + err.code); }
                });

                //remove requests
                var requestQuery1 = new Parse.Query("FriendRequest")
                requestQuery1.equalTo("fromUser", fromUser)
                requestQuery1.equalTo("toUser", toUser)

                var requestQuery2 = new Parse.Query("FriendRequest")
                requestQuery2.equalTo("fromUser", toUser)
                requestQuery2.equalTo("toUser", fromUser)

                 // NOTIFICATION
                var installationQuery = new Parse.Query(Parse.Installation);
                installationQuery.equalTo("user", pointerTo(toUserId, "_User"));
                sendPushNotificationTo(request, installationQuery, "", "InviteEvent", "", "")

                requestQuery1.find().then(function(results) {
                    return Parse.Object.destroyAll(results);
                }).then(function() {
                    console.log("deleted a row")
                }, function(error) {
                    console.log(error)
                });

                requestQuery2.find().then(function(results) {
                    return Parse.Object.destroyAll(results);
                }).then(function() {
                    console.log("deleted a row")
                }, function(error) {
                    console.log(error)
                });

                },
                error: function(error) {
                    console.log("Error retrieving user in query!");
                }

            });
        },
        error: function(error) {
            console.log("Error retrieving user in query!");
        }
        });
    }
    //response.success()
});

Parse.Cloud.define("SaveFriendRequest", function(request, response) {

    Parse.Cloud.useMasterKey();

    var fromUserId = request.params.fromUserId;
    var toUserId = request.params.toUserId;

    //see if one exists

    var friendRequestStatus = request.params.friendRequestStatus;

    deleteAllFriendRequests(fromUserId, toUserId, function(){

        var FriendRequest = Parse.Object.extend("FriendRequest");
        var friendRequest = new FriendRequest();

        friendRequest.save({
            useMasterKey: true,
            fromUser: {
                __type: "Pointer",
                className: "_User",
                objectId: fromUserId
            },
            toUser: {
                __type: "Pointer",
                className: "_User",
                objectId: toUserId
            },
            friendRequestStatus: friendRequestStatus
        }, {
            success: function(gameScore) {
                // The object was saved successfully.
                response.success();
            },
            error: function(gameScore, error) {
                // The save failed.
                // error is a Parse.Error with an error code and message.
                response.error(error);
            }
        });
    })
});

function deleteAllFriendRequests(fromUserId, toUserId, completion){

    var query1 = new Parse.Query("FriendRequest");
    query1.equalTo("fromUser", pointerTo(fromUserId, "_User"));
    query1.equalTo("toUser", pointerTo(toUserId, "_User"));

   var query2 = new Parse.Query("FriendRequest");
    query2.equalTo("fromUser", pointerTo(fromUserId, "_User"));
    query2.equalTo("toUser", pointerTo(toUserId, "_User"));

   var query = Parse.Query.or(query1, query2)

    query.find().then(function(results) {
        // Create a trivial resolved promise as a base case.
        var promise = Parse.Promise.as();
        _.each(results, function(result) {
            // For each item, extend the promise with a function to delete it.
            promise = promise.then(function() {
            // Return a promise that will be resolved when the delete is finished.
            return result.destroy();
            });
        });
        return promise;

    }).then(function() {
        // Every comment was deleted.
        completion();
    });
}

function pointerTo(id, className){

    return {
        __type: "Pointer",
        className: className,
        objectId: id
    };
}

function saveFriendRequestBetween(fromUserId, toUserId, status, completion) {

    var FriendRequest = Parse.Object.extend("FriendRequest");
    var friendRequest = new FriendRequest();

    friendRequest.save({
        useMasterKey: true,
        fromUser: {
            __type: "Pointer",
            className: "_User",
            objectId: fromUserId
        },
        toUser: {
            __type: "Pointer",
            className: "_User",
            objectId: toUserId
        },
        friendRequestStatus: status
    },
    {
        success: function(friendRequest) {

            completion(true)
        },
        error: function(friendRequest, error) {

            completion(false);
        }
    });
}

function formatAmountWithCurrencyId(currencyId, amount){

    var rc = ""

    if (typeof currencyId === 'undefined') {

        currencyId = 0;
    }

    if (currencyId == 0) {

        rc = "£" + amount.toFixed(2);
    }
    else if (currencyId == 1) {

        rc = "€" + amount.toFixed(2)
    }
    else if (currencyId == 2) {

        rc = "$" + amount.toFixed(2)
    }
    else if (currencyId == 3) {

        rc = ("kr " + amount.toFixed(2)).replace(".", ",")
    }

    return rc;
}
