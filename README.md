# omegle-crawler-node

Node library to connect to and interact with the Omegle website. This library includes support for captcha solving, as well as video chat.
This library is using puppeteer and is therefore using an instance of chromium to access Omegle exactly as a browser.

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

This library uses an event-based mechanism.
Start by binding your functions to the possible events and then start a conversation. All the events and methods are available in the documentation section [#documentation](below).

Crawler example usage:

```javascript
import { Handler } from "omegle-crawler-node";

const handler = new Handler({ headless: false });

handler.onConnected(() => handler.sendMessage("Hello."));
handler.onDisconnected(() => console.log("Disconnected"));
handler.onCaptcha(() => console.log("Captcha found"));

handler.startConversation("text");
handler.sendMessage("Hello");
```

### Usage with video

This library allows for video chat. In order to use video chat, you must provide a valid video file in the format `.y4m` so that Chromium may read it. More information about this format and how to create files that work can be found ["https://testrtc.com/y4m-video-chrome/"](here).

The path to the video file must be **absolute**;

Here is an example of using video chat:

```javascript
import { Handler } from "omegle-crawler-node";

const handler = new Handler();

handler.onConnected(() => handler.sendMessage("Hello."));
handler.onDisconnected(() => console.log("Disconnected"));
handler.onCaptcha(captchaIdentifier => console.log("Captcha found", captchaIdentifier));

handler.startConversation("video");
handler.sendMessage("Hello", __dirname + "/video.y4m"); // __dirname returns the path of the current directory.
```

## Documentation

### Events

Here are listed all the events that can be raised by this library.

#### onConnected(event)

Triggered when the instance has connected to a stranger.

```javascript
handler.onConnected(() => console.log("Connected to stranger!"));
```

#### onDisconnected(event)

Triggered when the instance has connected to a stranger.

```javascript
handler.onConnected(() => console.log("Connected to stranger!"));
```

#### onCaptcha(event)

Triggered when the instance has connected to a stranger.

```javascript
handler.onConnected(() => console.log("Connected to stranger!"));
```

#### onMessageReceived(event)

Triggered when the stranger has sent a message

```javascript
handler.onMessageReceived(message => console.log("Message received:", message));
```

#### onInformation(event)

Triggered when an information was printed on screen. Example of information messages: "Omegle couldn't find someone with the same interests".

```javascript
handler.onInformation(information => console.log("Received information", information));
```

#### onError(event)

Triggered when the instance has received an error. The error "Connection to server blocked." means you have been IP blocked by Omegle. This usually happens if you're connecting from a server based on a platform such as Azure or AWS.

```javascript
handler.onError(error => console.log("Received error", error));
```

#### onMessageSent(event)

Triggered when the instance has connected to a stranger.

```javascript
handler.onConnected(message => console.log("Script sent message", message));
```

#### onUnexpectedToken(event)

Triggered when the instance has received an unexpected token.

```javascript
handler.onConnected(unexpectedToken => console.log("Unexpected token!", unexpectedToken));
```

### Methods

Methods you can call on your `Handler` instance

#### startConversation(conversationType[,options])

Start looking for a conversation. Launches the browser if it is not already open. The parameters are different according to the conversation type specified (text or video).

For text: `startConversation("text", topics?: string[], cookiesFilePath?: string)`
For video: `startConversation(conversationType: "video", videoPath: string, topics?: string[], cookiesFilePath?: string)`

Returns a promise that resolves once the page has been opened and all listeners have been initialized.

Example:

```javascript
handler.startConversation("text", ["chat", "friends"], "./cookies");
```

#### sendMessage(message[,delay])

Sends message to the stranger. A delay between keystrokes can be given.
This delay is so that the information "Stranger is typing..." is displayed for a given amount of time.
The default delay is 50ms.

`sendMessage(message: string, delay?: number)`

Returns a promise that resolves once the message has been sent.

Example:

```javascript
handler.sendMessage("Hi there", 50);
```

#### Captcha solving

Included is a way to solve captchas using the 2captcha API. When a captcha is displayed on screen, the `onCaptcha` event is triggered, calling the bound function with a captcha identifier. This built-in method can be used as follows:

```javascript
handler.onCaptcha(captchaIdentifier => {
	handler.solveCaptchaWith2CaptchaApiKey(captchaIdentifier, "api_key");
});
```

You can use the captcha identifier with any API to solve this captcha. Once a result is given by the API, you can solve the captcha as follows:

```javascript
handler.onCaptcha(captchaIdentifier => {
	const result = getResultFromYourAPI(captchaIdentifier).then(result => handler.solveCaptcha(result));
});
```
