Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  update: function (userId, doc, fieldNames) {
    return ownsDocument(userId, doc) &&
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});

createCommentNotification = function (comment) {
  var post = Posts.findOne(comment.postId);

  // if somebody else than the owner comments on a post
  if (comment.userId !== post.userId) {
    // notify the owner
    Notifications.insert({
      userId: post.userId,
      postId: post._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  }
};


