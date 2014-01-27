Posts = new Meteor.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Posts.deny({
  update: function(userId, post, fieldNames){
    return (_.without(fieldNames, 'url', 'title').length > 0);
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
      userId: user._id,
      author: user.email,
      submitted: new Date().getTime()
    });

    var postId = Posts.insert(post);

    return postId;
  }
});
