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
      if (error)
        return alert(error.reason);

      Router.go('post', { '_id': postId });
    });
  }
});
