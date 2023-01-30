const { DialogflowApp } = require('actions-on-google');

app.intent('HelloIntent', (conv) => {
  conv.ask('Hello! How can I help you today?');
});


/*
    ChatGPT cURL requests:
    
*/