/**
 * Created by mfaivremacon on 14/02/2016.
 */

Template.memoryCardsAlbums.helpers({

  albums: function() {
    console.log('albums');
    var id = Meteor.userId();
    //console.log(id, mfmMemoryCardsAlbums.find().count());
    return mfmMemoryCardsAlbums.find({userId: id});
  }
});

Template.memoryCardsAlbum.helpers({

  phraseNumber: function() {
    return mfmMemoryCards.find({albumId: this._id}).count();
  }
});

Template.memoryCardsAlbum.events({

  'click .js-add': function(e) {
    e.preventDefault();
    Router.go('/memoryCards/add/' + this._id)
  },

  'click .js-edit': function(e) {
    e.preventDefault();
    Router.go('/memoryCards/albums/edit/' + this._id)
  },

  'click .js-revise': function(e) {
    e.preventDefault();
    console.log('revising', this._id);
    Router.go('/memoryCards/revise/' + this._id)
  }


});
