Template.postSubmit.created = function() {
  // Store the form validation errors in a Session variable
  // ex.:
  //   {
  //     title: 'Must have a title',
  //     url:   'Invalid url'
  //   }
  Session.set('postSubmitErrors', {});
};

Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    var errors = validatePost(post);
    if (!_.isEmpty(errors)) {
      return Session.set('postSubmitErrors', errors);
    }

    Meteor.call('postInsert', post, function(error, result) {
      if (error) return Errors.throw(error.reason);

      if (result.postExists) {
        Errors.throw('This link has already been posted');
      }

      Router.go('postPage', {_id: result._id});
    });
  }
});
