/**
 * Created by mfaivremacon on 11/02/2016.
 */

Template.memoryCardsAlbumAdd.events({

  'click .js-add': function(e, tpl) {
    e.preventDefault();
    var from = tpl.$('select[name=lgFrom]').val();
    var to = tpl.$('select[name=lgTo]').val();
    var name = tpl.$('input[name=name]').val();
    var descr = tpl.$('textarea[name=descr]').val();
    if(name) {
      Meteor.call('memoryCardsAlbumAdd', from, to, name, descr, function(err, rv) {
        Router.go('/memoryCards/add/' + rv)
      });
    }
  }

});

Template.memoryCardsAlbumEdit.events({

  'click button[type=submit]': function(e, tpl) {
    e.preventDefault();
    //var from = tpl.$('select[name=lgFrom]').val();
    //var to = tpl.$('select[name=lgTo]').val();
    var id = this._id;
    var name = tpl.$('input[name=name]').val();
    var descr = tpl.$('textarea[name=descr]').val();
    if(name) {
      Meteor.call('memoryCardsAlbumEdit', id, name, descr, function(err, rv) {
        Router.go('/memoryCards/albums');
      });
    }
  },

  'click .js-delete': function(e) {
    e.preventDefault();
    var id = this._id;
    Meteor.call('memoryCardsAlbumDelete', id, function() {
      Router.go('/memoryCards/albums');
    });
  }


});
