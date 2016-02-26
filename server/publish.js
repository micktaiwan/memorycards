Meteor.publish('mfmMemoryCardsLast', function(uid) {
  return mfmMemoryCards.find({}, {sort:{insertDate:-1}, limit:10});
});

Meteor.publish('mfmMemoryCards', function(uid) {
  return mfmMemoryCards.find({});
});

Meteor.publish('mfmMemoryCardsAlbumsMine', function(uid) {
  return mfmMemoryCardsAlbums.find({});
});

Meteor.publish('mfmMemoryCardsRevisions', function(uid) {
  return mfmMemoryCardsRevisions.find({});
});

Meteor.publish('mfmMemoryCardsLearnings', function(uid) {
  return mfmMemoryCardsLearnings.find({});
});
