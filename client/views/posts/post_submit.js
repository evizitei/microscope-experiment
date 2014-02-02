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
        Errors.throw(error.reason);

        if(error.error === 302){
          Router.go('postPage', {_id: error.details});
        }
      } else {
        Router.go('postPage', {_id: id});
      }
    });
  }
});
