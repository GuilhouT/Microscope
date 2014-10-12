Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});

Template.error.rendered = function() {
  var error = this.data;

  // Won't be executed in case of a redirection
  Meteor.defer(function() {
    Errors.update(error._id, { $set: { seen: true } });
  });
};
