let accountSID;
let accountToken;
const twilioPhoneNumber ="6468636486";

const fs = require('fs');
const path = require('path');
const fn = path.join(__dirname, 'config.json');
const data = fs.readFileSync(fn);

// our configuration file will be in json, so parse it and set the
// conenction string appropriately!
const conf = JSON.parse(data);
accountSID = conf.accountSID;
accountToken = conf.accountToken;

function sendText(recipient,msgText) {

//works
    const client = require('twilio')(accountSID,accountToken);


    client.messages.create({
        from: twilioPhoneNumber,
        to: toNumber,
        body: msgText
    }).then((messsage) => console.log(message.sid));

}



let toNumber = "3477612839";

sendText(toNumber,"na fam");

module.exports = {
    sendText: sendText
};