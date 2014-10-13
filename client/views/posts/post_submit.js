Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var $target = $(e.target);

    var post = {
      url: $target.find('[name=url]').val(),
      title: $target.find('[name=title]').val(),
      message: $target.find('[name=message]').val()
    };

    Meteor.call('post', post, function(error, postId) {
      if (error) {
        Errors.throw(error.reason);

        if (error.error === 302) {
          Router.go('postPage', { _id: error.details });
        }
      } else {
        Router.go('postPage', { '_id': postId });
      }
    });
  }
});
