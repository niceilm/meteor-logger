var LogProvider = new Logger.$LogProvider(window);

var debug = !!(Meteor.settings && Meteor.settings.public && Meteor.settings.public.logger && Meteor.settings.public.logger.debug);

$log = LogProvider.debugEnabled(debug).$get();