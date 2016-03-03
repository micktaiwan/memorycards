if(Package['iron:router']) {

  Package['iron:router'].Router.configure({
    // wait on the following subscriptions before rendering the page to ensure
    // the data it's expecting is present
    waitOn: function() {
      return [
        //Meteor.subscribe('users', Meteor.userId())
        //Meteor.subscribe('orbiter-avatars')
      ];
    }

  });

  Package['iron:router'].Router.map(function() {

    this.route('/memorycards/', {
      name: 'memoryCards',
      title: 'Memory Cards',
      waitOn: function() {
        return [
          Meteor.subscribe('mfmMemoryCardsLast')
        ]
      }
    });

    this.route('/memorycards/albums', {
      name: 'memoryCardsAlbums',
      title: 'Albums',
      waitOn: function() {
        return [
          Meteor.subscribe('mfmMemoryCardsAlbumsMine'),
          Meteor.subscribe('mfmMemoryCards')
        ];
      }
    });

    this.route('/memorycards/albums/add', {
      name: 'memoryCardsAlbumAdd',
      title: 'Adding album'
    });

    this.route('/memorycards/albums/edit/:_id', {
      name: 'memoryCardsAlbumEdit',
      title: 'Editing album',
      waitOn: function() {
        return [
          Meteor.subscribe('mfmMemoryCardsAlbumsMine'),
          Meteor.subscribe('mfmMemoryCards')
        ];
      },
      onBeforeAction: function() {
        var u = Meteor.user();
        if(!u) {
          Router.go('/');
          return;
        }
        var album = mfmMemoryCardsAlbums.find(this.params._id);
        if(!album) {
          Router.go('/');
          return;
        }
        this.next();
      },
      data: function() {
        return mfmMemoryCardsAlbums.findOne(this.params._id);
      }

    });

    this.route('/memorycards/add/:_id', {
      name: 'memoryCardsAdd',
      title: 'Adding',
      waitOn: function() {
        return [
          Meteor.subscribe('mfmMemoryCardsAlbumsMine'),
          Meteor.subscribe('mfmMemoryCards')
        ];
      },
      onBeforeAction: function() {
        var u = Meteor.user();
        if(!u) {
          Router.go('/');
          return;
        }
        if(!mfmMemoryCardsAlbums.findOne({userId: u._id})) {
          Router.go('/memorycards/albums/add');
          return;
        }
        var album = mfmMemoryCardsAlbums.find(this.params._id);
        if(!album) {
          Router.go('/');
          return;
        }
        this.next();
      },
      data: function() {
        return mfmMemoryCardsAlbums.findOne(this.params._id);
      }
    });

    this.route('/memorycards/revise/finished/:sessionId', {
      name: 'memoryCardsRevisionFinished',
      title: 'Revision finished',
      waitOn: function() {
        return [
          Meteor.subscribe('mfmMemoryCardsRevisions'),
          //Meteor.subscribe('mfmMemoryCardsAlbumsMine')
        ]
      },
/*
      data: function() {
        console.log(mfmMemoryCardsRevisions.find().count());
        var albumId = mfmMemoryCardsRevisions.findOne({_id: this.params.sessionId});
        console.log(this.params.sessionId, albumId);
        return mfmMemoryCardsAlbums.findOne(albumId);
      }
*/
    });

    this.route('/memorycards/revise/:_id', {
      name: 'memoryCardsRevise',
      title: 'Revise',
      waitOn: function() {
        return [ // TODO: ne s'abonner qu'à ce qu'il faut, pas tout !
          Meteor.subscribe('mfmMemoryCards'),
          Meteor.subscribe('mfmMemoryCardsRevisions'),
          Meteor.subscribe('mfmMemoryCardsAlbumsMine'),
          Meteor.subscribe('mfmMemoryCardsLearnings')
        ]
      },
      data: function() {
        return mfmMemoryCardsAlbums.findOne(this.params._id);
      }
    });

  });

}
else {
  console.log('package memory-cards depends on package iron:router')
}
