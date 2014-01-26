Posts = new Meteor.Collection('posts');

Posts.allow({
  insert: function(userId, doc) {
    return !! userId;
  },

  remove: function(userId, doc) {
    var hasUserId = !! userId;
    var ownsThisDoc = doc.userId == userId;
    return hasUserId && ownsThisDoc;
  }
});

Meteor.methods({
  post: function(postAttributes){
    var user = Meteor.user();
    var postWithSameLink = Posts.findOne({ url: postAttributes.url });

    if (!user){
      throw new Meteor.Error(401, "You need to login to post new stories");
    } else if (!postAttributes.title) {
      throw new Meteor.Error(422, 'Please fill in a headline');
    } else if (postAttributes.url && postWithSameLink) {
      throw new Meteor.Error(302, 'this link has alread been posted', postWithSameLink._id);
    }

    var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
      title: postAttributes.title + (this.isSimulation ? '(client)' : '(server)'),
      userId: user._id,
      author: user.email,
      submitted: new Date().getTime()
    });


    if (!this.isSimulation) {
      var Future = Npm.require('fibers/future');
      var future = new Future();
      Meteor.setTimeout(function(){
        future.return();
      }, 5000);
      future.wait();
    }

    var postId = Posts.insert(post);

    return postId;
  }
});
