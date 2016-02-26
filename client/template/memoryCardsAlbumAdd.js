/**
 * Created by mfaivremacon on 11/02/2016.
 */

Template.memoryCardsAlbumAdd.events({

  'click .js-add': function(e, tpl) {
    e.preventDefault();
    var name = tpl.$('input[name=name]').val();
    var descr = tpl.$('textarea[name=descr]').val();
    if(name) {
      Meteor.call('memoryCardsAlbumAdd', name, descr, function(err, rv) {
        Router.go('/memoryCards/add/'+rv)
      });
    }
  }

});
