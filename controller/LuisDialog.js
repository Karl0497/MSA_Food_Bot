var builder = require('botbuilder');
// Some sections have been omitted

exports.startDialog = function (bot) {
     // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
     var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/7d8047cc-0a06-406f-8de5-4e21fabb4c13?subscription-key=17d226b360ee4ff7bcd3e75992dbda23&verbose=true&timezoneOffset=0&q=');
     
        bot.recognizer(recognizer);
     
        bot.dialog('GetCalories', function (session, args) {
             session.send("get calories");
         }).triggerAction({
             matches: 'GetCalories'
         });

        bot.dialog('DeleteFavourite', function (session, args) {
            session.send("del fav");
        }).triggerAction({
            matches: 'DeleteFavourite'
        });

        bot.dialog('GetFavouriteFood', function (session, args) {
            session.send("get fav");
        }).triggerAction({
            matches: 'GetFavouriteFood'
        });

        bot.dialog('LookForfavourite', function (session, args) {
            session.send("look for fav");
        }).triggerAction({
            matches: 'LookForFavourite'
        });

        bot.dialog('WantFood', function (session, args) {
            session.send("want food");
        }).triggerAction({
            matches: 'WantFood'
        });

}