/**
 * Created by mfaivremacon on 01/03/2016.
 */

Meteor.startup(function() {

  // cleanup
  mfmMemoryCards.remove({albumId: null});

});
