Template.postSubmit.events({
  'submit form': function(e){
    e.preventDefault();

    var $postForm = $(e.target);
    var post = {
      url: $postForm.find('[name=url]').val(),
      title: $postForm.find('[name=title]').val(),
      message: $postForm.find('[name=message]').val()
    }

    Meteor.call('post', post, function(error, id) {
      if (error){
        return alert(error.reason);
      }
    });
    Router.go('postsList');
  }
});
