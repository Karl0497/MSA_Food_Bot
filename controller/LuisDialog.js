var builder = require('botbuilder');
var food = require('./FavouriteFoods');
var restaurant = require('./RestaurantCard');
var isAttachment = false;
// Some sections have been omitted

exports.startDialog = function (bot) {
     // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
     var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/7d8047cc-0a06-406f-8de5-4e21fabb4c13?subscription-key=17d226b360ee4ff7bcd3e75992dbda23&verbose=true&timezoneOffset=0&q=');
     function isAttachment(session) { 
        var msg = session.message.text;
        if ((session.message.attachments && session.message.attachments.length > 0) || msg.includes("http")) {
            //call custom vision
            customVision.retreiveMessage(session);
    
            return true;
        }
        else {
            return false;
        }
    }
    
    bot.recognizer(recognizer);
    console.log(isAttachment==true);
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

        bot.dialog('GetFavouriteFood', [
    function (session, args, next) {
        session.dialogData.args = args || {};        
        if (!session.conversationData["username"]) {
            builder.Prompts.text(session, "Enter a username to setup your account.");
                            
        } else {
            next(); // Skip if we already have this info.
        }
    },
    function (session, results, next) {
        // if (!isAttachment(session)) {
            
            if (results.response) {
                session.conversationData["username"] = results.response;
            }

            session.send("Retrieving your favourite foods");
            food.displayFavouriteFood(session, session.conversationData["username"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
        // }
    }
    ]).triggerAction({
        matches: 'GetFavouriteFood'
    });

    bot.dialog('LookForfavourite', function (session, args) {
        session.send("look for fav");
    }).triggerAction({
        matches: 'LookForFavourite'
    });

    bot.dialog('WantFood', function (session, args) {
        session.send("want food");
        var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'food');
        
                    // Checks if the for entity was found
                    if (foodEntity) {
                        session.send('Looking for restaurants which sell %s...', foodEntity.entity);
                        restaurant.displayRestaurantCards(foodEntity.entity, "auckland", session);
                    } else {
                        session.send("No food identified! Please try again");
                    }
    }).triggerAction({
        matches: 'WantFood'
    });
        

}