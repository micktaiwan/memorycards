/**
 * Created by mfaivremacon on 11/02/2016.
 */

Template.memoryCardsAdd.helpers({

  album: function() {
    return this;
  }

});

Template.memoryCardsAdd.events({

  'click .js-add': function(e, tpl) {
    e.preventDefault();
    var p1 = tpl.$('input[name=phrase1]').val();
    var p2 = tpl.$('input[name=phrase2]').val();
    if(p1 && p2) {
      Meteor.call('memoryCardsAdd', p1, p2, this._id);
      tpl.$('input[name=phrase1]').val('');
      tpl.$('input[name=phrase2]').val('');
      tpl.$('input[name=phrase1]').focus();
      tpl.$("div")
        .velocity({left: 50}, 100, "easeOutQuad")
        .velocity({left: 0}, 300, "easeInSine");
    }
  },

  'click .js-bulk-add-link': function(e, tpl) {
    e.preventDefault();
    console.log('o');
    tpl.$('.bulk-block').toggle();
  },

  'click .js-bulk-add': function(e, tpl) {
    e.preventDefault();
    var value = tpl.$('textarea[name=bulkAdd]').val();
    if(value) {
      Meteor.call('memoryCardsBulkAdd', value, this._id);
    }
  }

});
