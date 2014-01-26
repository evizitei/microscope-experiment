Template.postSubmit.events({
  'submit form': function(e){
    e.preventDefault();

    var $postForm = $(e.target);
    var post = {
      url: $postForm.find('[name=url]').val(),
      title: $postForm.find('[name=title]').val(),
      message: $postForm.find('[name=message]').val()
    }

    post._id = Posts.insert(post);
    Router.go('postPage', post);
  }
});
