/**
 * Created by mfaivremacon on 11/02/2016.
 */

var session_id = null;
var left = 0;

// General comparison function for convenience
var compare = function(x, y) {
  if(x === y) return 0;
  return x > y ? 1 : -1;
};

var sortPhrases = function(phrases) {
  return phrases.sort(function(x, y) {
    /*    var rx = x.rank;
     var ry = y.rank;
     if(rx !== ry) return compare(rx, ry);*/
    if(!x.seen) x.seen = 0;
    if(!y.seen) y.seen = 0;
    return compare(x.seen, y.seen);
  })
};

var _getNextPhrase = function(session_id) {
  var phrases = sortPhrases(_.filter(mfmMemoryCardsRevisions.findOne(session_id).phrases, function(p) {
    return (p.rank <= 1 && p.seen <= 1) || (p.rank <= 2 && p.seen <= 0);
  }));
  left = phrases.length - 1;
  var rv = phrases[0];
  if(!rv)
    Router.go('memoryCardsRevisionFinished', {sessionId: session_id});
  Session.set('currentPhrase', rv);
  return rv;
};

Template.memoryCardsRevise.onCreated(function() {

  var uid = Meteor.userId();
  // get current revision session with this user if exists
  var album_id = this.data._id;
  var session = mfmMemoryCardsRevisions.findOne({userId: uid, albumId: album_id});
  if(session) {
    session_id = session._id;
    console.log('found session', session_id);
    Session.set('memoryCardsRevisionSession', session_id);
    _getNextPhrase(session_id);
  }
  else {
    console.log('no session');
    Meteor.call('memoryCardsCreateRevisionSession', album_id, function(err, rv) {
      if(!err) {
        session_id = rv;
        Session.set('memoryCardsRevisionSession', session_id);
        console.log('created session', session_id);
        _getNextPhrase(session_id);
      }
    });
  }

});

Template.memoryCardsRevise.helpers({

  getNextPhrase: function() {
    return Session.get('currentPhrase');
  },

  left: function() {
    return left;
  }


});

Template.memoryCardsRevise.events({

  'click .js-click-show-answer': function(ev, tpl) {
    tpl.$('.js-click-show-answer').hide();
    tpl.$('.initiallyHidden').show();
  },

  'click .js-answer': function(ev, tpl) {
    var rank = ev.target.getAttribute("data-rank");
    Meteor.call('memoryCardsSetRank', session_id, this.albumId, Session.get('currentPhrase')._id, rank);
    tpl.$('.initiallyHidden').hide();
    tpl.$('.js-click-show-answer').show();
    _getNextPhrase(session_id);
  }

});
