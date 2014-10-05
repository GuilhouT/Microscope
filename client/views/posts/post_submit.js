Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var $target = $(e.target);

    var post = {
      url: $target.find('[name=url]').val(),
      title: $target.find('[name=title]').val(),
      message: $target.find('[name=message]').val()
    };

    post._id = Posts.insert(post);

    Router.go('postPage', post);
  }
});
