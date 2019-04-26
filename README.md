# omegle-crawler-node

Node library to connect to and interact with the Omegle website. This library includes support for captcha solving, as well as video chat.
This library is using puppeteer and is therefore using an instance of chromium to access Omegle exactly as a browser.
[//]: # "If you wish to use this library with puppeteer-core (puppeteer without the chromium download) please head over to [omegle-crawler-node-nc](https://github.com/LysandreJik/omegle-crawler-node-nc)."

## Getting started

### Installation

To use omegle-node-crawler in your project, run:

```
npm i omegle-node-crawler
```

or

```
yarn add omegle-node-crawler
```

### Usage

Crawler example usage:

```
import { Handler } from "omegle-crawler-node";

const handler = new Handler({ headless: false });

handler.onConnected(() => handler.sendMessage("Hello."));
handler.onDisconnected(() => console.log("Disconnected"));
handler.onCaptcha(() => console.log("Captcha found"));

handler.startConversation("text");
handler.sendMessage("Hello");

```

## Documentation
