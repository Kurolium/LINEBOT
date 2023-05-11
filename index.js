const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'TAmeMYYCwlpOUcnapkkyGq2q8+QQehDM/u+q92TA99nXYLsDjT/uJmvip8Ku8QDNWKO64X/OZcveRB/UiAgjqEabGCgAg3AvCcSRL/OA3zpdjXO4wnAU5Cxhs6qruA3TByQf13e0QLeHpFaPlquPjgdB04t89/1O/w1cDnyilFU=',
  channelSecret: '38f1f4db4e932e8ec4d8d33c3a74d14c',
};

const client = new Client(config);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/webhook', (req, res) => {
  const events = req.body.events;
  events.forEach((event) => {
    if (event.type === 'message' && event.message.type === 'text') {
      const message = {
        type: 'text',
        text: event.message.text,
      };

      client.replyMessage(event.replyToken, message)
        .then(() => {
          console.log('Message sent successfully!');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
  
  res.status(200).end();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
