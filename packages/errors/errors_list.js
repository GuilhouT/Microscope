Template.meteorErrors.helpers({
  errors: function() {
    return Errors.collection.find();
  }
});

Template.meteorError.rendered = function() {
  var error = this.data;

  // Won't be executed in case of a redirection
  Meteor.defer(function() {
    Errors.collection.update(error._id, { $set: { seen: true } });
  });
};
