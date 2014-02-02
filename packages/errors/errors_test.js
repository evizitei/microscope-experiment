var checkErrorCount = function(test, params, count){
  test.equal(Errors.collection.find(params).count(), count);
};

Tinytest.add("Errors collection works", function(test){
  checkErrorCount(test, {}, 0);

  Errors.throw('a new error!');
  checkErrorCount(test, {}, 1);

  Errors.collection.remove({});
  checkErrorCount(test, {}, 0);
});

Tinytest.addAsync("Errors template works", function(test){
  Errors.throw('a new error!');
  checkErrorCount(test, {},0);
  checkErrorCount(test, {seen: false},1);

  OnscreenDiv(Spark.render(function() {
    return Template.meteorErrors();
  }));

  Meteor.setTimeout(function(){
    checkErrorCount(test, {seen: false},0);
    checkErrorCount(test, {}, 1);
    Errors.clearSeen();
    checkErrorCount(test, {seen: true},0);
    return done();
  }, 500);
});
