var addPair = function(lngFrom, lngTo, phrase1, phrase2, date, album_id) {
  //console.log('addPair', Meteor.userId, lngFrom, lngTo, phrase1, phrase2);
  if(phrase1 && phrase2)
    mfmMemoryCards.insert({
      userId: Meteor.userId(),
      lngFrom: lngFrom,
      lngTo: lngTo,
      phrase1: phrase1,
      phrase2: phrase2,
      insertDate: date,
      albumId: album_id
    });
};

Meteor.methods({

  memoryCardsAdd: function(p1, p2, album_id) {
    console.log('memoryCardsAdd', p1, p2);
    var date = new Date();
    addPair('es', 'fr', p1, p2, date, album_id);
  },

  memoryCardsAlbumAdd: function(name, descr) {
    console.log('memoryCardsAlbumAdd', name, descr);
    var date = new Date();
    return mfmMemoryCardsAlbums.insert({
      userId: Meteor.userId(),
      name: name,
      descr: descr,
      insertDate: date
    });
  },

  memoryCardsBulkAdd: function(bulk, album_id) {
    //console.log('memoryCardsBulkAdd', test);
    var date = new Date();
    var lines = bulk.split('\n');
    var len = lines.length;
    for(var i = 0; i < len; i++) {
      var arr = lines[i].split('\t');
      addPair('es', 'fr', arr[0], arr[1], date, album_id);
    }
  },

  memoryCardDelete: function(id) {
    console.log('memoryCardsDelete', id);
    return mfmMemoryCards.remove({_id: id});
  },

  memoryCardsCreateRevisionSession: function(album_id) {
    var uid = Meteor.userId();
    mfmMemoryCardsRevisions.remove({userId: uid});
    // get all cards
    var cards = mfmMemoryCards.find().fetch();
    // mix with ranks
    var learnings = mfmMemoryCardsLearnings.find({userId: uid}).fetch();
    var len = learnings.length;
    for(var i = 0; i < len; i++) {
      var test = _.find(cards, function(card) {
        return card._id == learnings[i]._id
      });
      test.rank = learnings[i].rank;
    }
    var phrases = _.sortBy(cards, function(card) {
      if(!card.rank) card.rank = 0;
      if(!card.seen) card.seen = 0;
      return card.rank;
    });
    var session_id = mfmMemoryCardsRevisions.insert({
      userId: uid,
      insertDate: new Date(),
      phrases: phrases.slice(0, 10)
    });
    return session_id;
  },

  memoryCardsSetRank: function(sessionId, id, rank) {
    console.log('memoryCardsSetRank', sessionId, id, rank);
    var uid = Meteor.userId();
    mfmMemoryCardsRevisions.update({userId: uid, "phrases._id": id}, {
      $set: {"phrases.$.rank": parseInt(rank)},
      $inc: {"phrases.$.seen": 1}
    });
    return mfmMemoryCardsLearnings.update({_id: id}, {
      userId: uid,
      sessionId: sessionId,
      insertDate: new Date(),
      phraseId: id,
      rank: parseInt(rank)
    }, {upsert: 1});
  }

});
