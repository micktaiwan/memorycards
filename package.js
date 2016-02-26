Package.describe({
  name: 'mickaelfm:memorycards',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: "Tool for learning another language vocabulary",
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: ''
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use(["tap:i18n@1.7.0"], ["client", "server"]);

  api.use([
    'iron:router@1.0.12',
    'less',
    'velocityjs:velocityjs'
  ]);

  api.use("templating", "client");

  //api.add_files("package-tap.i18n", ["client", "server"]);

  api.add_files([
      'client/template/index.html',
      'client/template/index.js',
      'client/template/memoryCards.less',
      'client/template/memoryCardsAdd.html',
      'client/template/memoryCardsAdd.js',
      'client/template/memoryCardsAlbumAdd.html',
      'client/template/memoryCardsAlbumAdd.js',
      'client/template/memoryCardsRevise.html',
      'client/template/memoryCardsRevise.js',
      'client/template/memoryCardsRevisionFinished.html',
      'client/template/memoryCardsRevisionFinished.js',
      'client/template/memoryCardsAlbums.html',
      'client/template/memoryCardsAlbums.js',
      'lib/init.js'
    ],
    ['client']);

  api.add_files([
      'lib/collections.js',
      'lib/methods.js',
      'lib/router.js'
    ],
    ['server', 'client']);

  api.add_files([
      'server/publish.js'
    ],
    ['server']);

  api.export('mfmMemoryCardsLearnings',['server','client']);

  var languages = ["en", "fr", "it"];
  var languagesPaths = languages.map(function(language) {
    return "i18n/" + language + ".i18n.json";
  });

  api.addFiles(languagesPaths, ["client", "server"]);

});
