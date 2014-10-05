Posts = new Meteor.Collection('posts');

Posts.allow({
  insert: function(userId, doc) {
    // allow insertion only for authenticated users
    return !!userId;
  }
});
