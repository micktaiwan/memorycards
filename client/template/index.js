/**
 * Created by mfaivremacon on 11/02/2016.
 */


Template.memoryCards.helpers({

  entries: function() {
    return mfmMemoryCards.find({}, {sort: {insertDate: -1}});
  }

});

Template.memoryCards.events({
  'click .js-delete': function() {
    Meteor.call('memoryCardDelete', this._id);
  }
});

Template.memoryCardsEntry.helpers({

  hiddenClass: function() {
    return this.userId == Meteor.userId() ? '' : 'hidden';
  }

});
