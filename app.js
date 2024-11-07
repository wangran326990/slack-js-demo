const express = require('express')
// const app = express()
const { WebClient } = require('@slack/web-api');
const { App } = require('@slack/bolt');


// An access token (from your Slack app or custom integration - xoxp, xoxb)
const token = process.env.SLACK_BOT_TOKEN;



// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'C07V2L0JW5T';


const app = new App({
    token: token,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
  });

const web = new WebClient(token);

app.message(async ({ context, event }) => {
    if (!event.files) {
        return;
    }
    const downloads = await Promise.all(event.files.map(async (file) => {
        const download = await fetch(file.url_private_download, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return download.text();
    }));
    console.log(downloads);
});


  (async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);
  
    console.log('⚡️ Bolt app is running!');
  })();