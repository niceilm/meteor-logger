Package.describe({
  name: 'flynn:logger',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'same interface client/server by logger',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/niceilm/meteor-logger.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('meteorhacks:npm@1.5.0', 'server');
  api.addFiles('logger_client.js', 'client');
  api.addFiles('logger_server.js', 'server');
  api.export('logger');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('flynn:logger');
  api.addFiles('logger-tests.js');
});

Npm.depends({
  "winston": "1.0.1"
});