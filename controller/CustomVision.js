var request = require('request'); //node module for http post requests

exports.retreiveMessage = function (session){

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/16d00b92-bfef-4148-b4e6-b8e60f46f15d/image?iterationId=e4cfa5a9-0839-4143-bd41-eb57145a8b3f',
        json: true,
        headers: {
            'Content-Type': 'application/octet-stream',
            'Prediction-Key': 'eaf9f18bb3bb43f0a15cc13a07d64708'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body){
        console.log(validResponse(body));
        session.send(validResponse(body));
    });
}

function validResponse(body){
    if (body && body.Predictions && body.Predictions[0].Tag){
        return "This is " + body.Predictions[0].Tag
    } else{
        console.log('Oops, please try again!');
    }
}