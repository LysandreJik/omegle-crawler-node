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
Start by binding your functions to the possible events and then start a conversation. All the events and methods are available in the documentation section [below](#documentation).

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

This library allows for video chat. In order to use video chat, you must provide a valid video file in the format `.y4m` so that Chromium may read it. More information about this format and how to create files that work can be found [here](https://testrtc.com/y4m-video-chrome/).

The path to the video file must be **absolute**.

Here is an example of using video chat:

```javascript
import { Handler } from "omegle-crawler-node";

const handler = new Handler();

handler.onConnected(() => handler.sendMessage("Hello."));
handler.onDisconnected(() => console.log("Disconnected"));
handler.onCaptcha(captchaIdentifier => console.log("Captcha found", captchaIdentifier));

handler.startConversation("video", __dirname + "/video.y4m");
handler.sendMessage("Hello"); // __dirname returns the path of the current directory.
```

## Documentation

### Instanciation

Each instance of `Handler` is independant, allowing you to have multiple crawlers running at the same time. _Keep in mind that the most crawlers are running, the highter the chance that Omegle detects you're a bot and flags you, increasing your captcha rate and the chance to get IP banned._

Create a new instance using the `new` keyword:

#### new Handler(options)

The options are puppeteer options, and can therefore be found on their [API page](https://github.com/GoogleChrome/puppeteer/blob/v1.15.0/docs/api.md#puppeteerlaunchoptions).
Some of them are overriden when trying to use the video: `--use-fake-ui-for-media-stream`, `--use-fake-device-for-media-stream`, `--use-file-for-fake-video-capture=${videoPath}`

Example:

```typescript
const handler = new Handler();
```

### Events

Here are listed all the events that can be triggered by this library.

#### onConnected(event: () => any)

Triggered when the instance has connected to a stranger.

Example:

```javascript
handler.onConnected(() => console.log("Connected to stranger!"));
```

#### onDisconnected(event: () => any)

Triggered when the instance has been disconnected from the stranger.

Example:

```javascript
handler.onDisconnected(() => console.log("Disconnected from stranger!"));
```

#### onCaptcha(even: (captchaID: string) => any)

Triggered when the instance has received a captcha.

Example:

```javascript
handler.onCaptcha(captchaID => console.log("Captcha detected", captchaID));
```

#### onMessageReceived(event: (message: string) => any)

Triggered when the stranger has sent a message

Example:

```javascript
handler.onMessageReceived(message => console.log("Message received:", message));
```

#### onInformation(event: (information: string) => any)

Triggered when an information was printed on screen.

Example of information messages: "Omegle couldn't find someone with the same interests".

Example:

```javascript
handler.onInformation(information => console.log("Received information", information));
```

#### onError(event: (error: string) => any)

Triggered when the instance has received an error.

The error "Connection to server blocked." means you have been IP blocked by Omegle. This usually happens if you're connecting from a server based on a platform such as Azure or AWS.

Example:

```javascript
handler.onError(error => console.log("Received error", error));
```

#### onMessageSent(event: (message: string) => any)

Triggered when the instance has connected to a stranger.

Example:

```javascript
handler.onConnected(message => console.log("Script sent message", message));
```

#### onUnexpectedToken(event: (unexpectedToken: string) => any)

Triggered when the instance has received an unexpected token.

Example:

```javascript
handler.onConnected(unexpectedToken => console.log("Unexpected token!", unexpectedToken));
```

### Methods

Methods you can call on your `Handler` instance

#### startConversation(conversationType: "text" | "video" [,options])

Start looking for a conversation. Launches the browser if it is not already open. The parameters are different according to the conversation type specified (text or video).

For text:

```typescript
startConversation("text", topics?: string[], cookiesFilePath?: string)
```

For video:

```typescript
startConversation(conversationType: "video", videoPath: string, topics?: string[], cookiesFilePath?: string)
```

Returns a promise that resolves once the page has been opened and all listeners have been initialized.

Example:

```javascript
handler.startConversation("text", ["chat", "friends"], "./cookies");
handler.startConversation("video", "/Users/<user>/file.y4m", ["chat", "friends"], "./cookies");
```

#### sendMessage(message: string, delay?: number)

Sends message to the stranger. A delay between keystrokes can be given.
This delay is so that the information "Stranger is typing..." is displayed for a given amount of time.
The default delay is 50ms.

Returns a promise that resolves once the message has been sent.

Example:

```javascript
handler.sendMessage("Hi there", 50);
```

#### solveCaptchaWith2CaptchaApiKey(captchaIdentifier: string, twoCaptchaAPIKey: string)

Included is a way to solve captchas using the 2captcha API. When a captcha is displayed on screen, the `onCaptcha` event is triggered, calling the bound function with a captcha identifier. This built-in method can be used as follows:

Returns a promise that resolves once the captcha has been solved.

```javascript
handler.onCaptcha(captchaIdentifier => {
	handler.solveCaptchaWith2CaptchaApiKey(captchaIdentifier, "api_key");
});
```

#### solveCaptcha(captchaResult: string)

You can use the captcha identifier with any API to solve this captcha. Once a result is given by the API, you can solve the captcha as follows:

Returns a promise that resolves once the captcha has been solved.

```javascript
handler.onCaptcha(captchaIdentifier => {
	const result = getResultFromYourAPI(captchaIdentifier).then(result => handler.solveCaptcha(result));
});
```

#### exit()

Closes the browser.

Returns a promise that resolves once the browser has been closed.

```javascript
handler.exit();
```
