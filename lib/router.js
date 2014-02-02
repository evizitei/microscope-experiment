Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('posts'); }
});

// HELPER METHODS
var postById = function(){
  return Posts.findOne(this.params._id);
};

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()){
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
    this.stop();
  }
}
// END HELPER METHODS

Router.map(function() {
  this.route('postsList', {path: '/'});

  this.route('postPage', {
    path: "/posts/:_id",
    data: postById
  });

  this.route('postEdit', {
    path: '/posts/:_id/edit',
    data: postById
  });

  this.route('postSubmit', {
    path: '/submit'
  });
});


Router.before(requireLogin, {only: 'postSubmit'});
Router.before(function(){ Errors.clearSeen(); });
