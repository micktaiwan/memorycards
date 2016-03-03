/**
 * Created by mfaivremacon on 11/02/2016.
 */

Template.memoryCardsRevisionFinished.onCreated(function() {

  var uid = Meteor.userId();
  // get current revision session with this user if exists
  var session = mfmMemoryCardsRevisions.findOne({userId: uid});
  if(session) {
    Session.set('memoryCardsRevisionSession', session.id);
  }
  else console.error('no session ?');

});

Template.memoryCardsRevisionFinished.helpers({

  score: function() {
    var uid = Meteor.userId();
    var ph = mfmMemoryCardsRevisions.findOne({userId: uid}).phrases;
    return _.inject(_.map(ph, function(p) {
      return p.rank;
    }), function(init, rank) {
      return init + rank;
    }, 0);
  },

  phrases: function() {
    var uid = Meteor.userId();
    return mfmMemoryCardsRevisions.findOne({userId: uid}).phrases;
  }

});

Template.memoryCardsRevisionFinished.events({

  'click .js-start-revision': function() {
    /*
     var id = this;
     Meteor.call('memoryCardsCreateRevisionSession', id, function() {
     Router.go('memoryCardsRevise');
     });
     */
    Router.go('memoryCardsAlbums');
  }

});
