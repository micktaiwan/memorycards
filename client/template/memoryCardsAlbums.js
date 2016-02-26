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

  'click .js-add': function(e, tpl) {
    e.preventDefault();

    Router.go('/memoryCards/add/' + this._id)
  }

});
