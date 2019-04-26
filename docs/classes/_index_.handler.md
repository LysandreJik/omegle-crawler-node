[omegle-crawler-node](../README.md) > ["index"](../modules/_index_.md) > [Handler](../classes/_index_.handler.md)

# Class: Handler

## Hierarchy

**Handler**

## Index

### Constructors

* [constructor](_index_.handler.md#constructor)

### Properties

* [__onCaptcha](_index_.handler.md#__oncaptcha)
* [__onConnected](_index_.handler.md#__onconnected)
* [__onDisconnected](_index_.handler.md#__ondisconnected)
* [__onError](_index_.handler.md#__onerror)
* [__onInformation](_index_.handler.md#__oninformation)
* [__onMessageReceived](_index_.handler.md#__onmessagereceived)
* [__onMessageSent](_index_.handler.md#__onmessagesent)
* [__onUnexpectedToken](_index_.handler.md#__onunexpectedtoken)
* [browser](_index_.handler.md#browser)
* [page](_index_.handler.md#page)
* [puppeteerOptions](_index_.handler.md#puppeteeroptions)

### Methods

* [__observeLogs](_index_.handler.md#__observelogs)
* [exit](_index_.handler.md#exit)
* [onCaptcha](_index_.handler.md#oncaptcha)
* [onConnected](_index_.handler.md#onconnected)
* [onDisconnected](_index_.handler.md#ondisconnected)
* [onError](_index_.handler.md#onerror)
* [onInformation](_index_.handler.md#oninformation)
* [onMessageReceived](_index_.handler.md#onmessagereceived)
* [onMessageSent](_index_.handler.md#onmessagesent)
* [onUnexpectedToken](_index_.handler.md#onunexpectedtoken)
* [sendMessage](_index_.handler.md#sendmessage)
* [solveCaptcha](_index_.handler.md#solvecaptcha)
* [solveCaptchaWith2CaptchaApiKey](_index_.handler.md#solvecaptchawith2captchaapikey)
* [startConversation](_index_.handler.md#startconversation)

### Object literals

* [__conversationFailSafe](_index_.handler.md#__conversationfailsafe)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Handler**(options: *`__type`*): [Handler](_index_.handler.md)

*Defined in index.ts:24*

**Parameters:**

| Name | Type |
| ------ | ------ |
| options | `__type` |

**Returns:** [Handler](_index_.handler.md)

___

## Properties

<a id="__oncaptcha"></a>

### `<Private>``<Optional>` __onCaptcha

**● __onCaptcha**: *`undefined` \| `function`*

*Defined in index.ts:20*

___
<a id="__onconnected"></a>

### `<Private>``<Optional>` __onConnected

**● __onConnected**: *`undefined` \| `function`*

*Defined in index.ts:17*

___
<a id="__ondisconnected"></a>

### `<Private>``<Optional>` __onDisconnected

**● __onDisconnected**: *`undefined` \| `function`*

*Defined in index.ts:19*

___
<a id="__onerror"></a>

### `<Private>``<Optional>` __onError

**● __onError**: *`undefined` \| `function`*

*Defined in index.ts:16*

___
<a id="__oninformation"></a>

### `<Private>``<Optional>` __onInformation

**● __onInformation**: *`undefined` \| `function`*

*Defined in index.ts:21*

___
<a id="__onmessagereceived"></a>

### `<Private>``<Optional>` __onMessageReceived

**● __onMessageReceived**: *`undefined` \| `function`*

*Defined in index.ts:18*

___
<a id="__onmessagesent"></a>

### `<Private>``<Optional>` __onMessageSent

**● __onMessageSent**: *`undefined` \| `function`*

*Defined in index.ts:23*

___
<a id="__onunexpectedtoken"></a>

### `<Private>``<Optional>` __onUnexpectedToken

**● __onUnexpectedToken**: *`undefined` \| `function`*

*Defined in index.ts:22*

___
<a id="browser"></a>

### `<Optional>` browser

**● browser**: *`Browser`*

*Defined in index.ts:12*

___
<a id="page"></a>

### `<Optional>` page

**● page**: *`Page`*

*Defined in index.ts:13*

___
<a id="puppeteeroptions"></a>

###  puppeteerOptions

**● puppeteerOptions**: *`__type`*

*Defined in index.ts:14*

___

## Methods

<a id="__observelogs"></a>

### `<Private>` __observeLogs

▸ **__observeLogs**(info: *`ConsoleMessage`*): `Promise`<`void`>

*Defined in index.ts:268*

**Parameters:**

| Name | Type |
| ------ | ------ |
| info | `ConsoleMessage` |

**Returns:** `Promise`<`void`>

___
<a id="exit"></a>

###  exit

▸ **exit**(): `Promise`<`void`>

*Defined in index.ts:126*

Closes the browser.

**Returns:** `Promise`<`void`>

___
<a id="oncaptcha"></a>

###  onCaptcha

▸ **onCaptcha**(event: *`function`*): `void`

*Defined in index.ts:229*

Event triggered when a captcha needs to be solved in order to access the chatroom.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| event | `function` |  function that will be called when the event is triggered. |

**Returns:** `void`

___
<a id="onconnected"></a>

###  onConnected

▸ **onConnected**(event: *`function`*): `void`

*Defined in index.ts:202*

Event triggered when the user is connected to a chatroom.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| event | `function` |  function that will be called when the event is triggered. |

**Returns:** `void`

___
<a id="ondisconnected"></a>

###  onDisconnected

▸ **onDisconnected**(event: *`function`*): `void`

*Defined in index.ts:221*

Event triggered when the user is disconnected from the chatroom.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| event | `function` |  function that will be called when the event is triggered. |

**Returns:** `void`

___
<a id="onerror"></a>

###  onError

▸ **onError**(event: *`function`*): `void`

*Defined in index.ts:248*

Event triggered when the chatroom raises an error.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| event | `function` |  function that will be called when the event is triggered. |

**Returns:** `void`

___
<a id="oninformation"></a>

###  onInformation

▸ **onInformation**(event: *`function`*): `void`

*Defined in index.ts:240*

Event triggered when the an information is given.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| event | `function` |  function that will be called when the event is triggered. |

**Returns:** `void`

___
<a id="onmessagereceived"></a>

###  onMessageReceived

▸ **onMessageReceived**(event: *`function`*): `void`

*Defined in index.ts:213*

Event triggered when the stranger sent a message.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| event | `function` |  function that will be called when the event is triggered. |

**Returns:** `void`

___
<a id="onmessagesent"></a>

###  onMessageSent

▸ **onMessageSent**(event: *`function`*): `void`

*Defined in index.ts:264*

Event triggered when the user sent a message. Used to verify that the message has been delivered.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| event | `function` |  function that will be called when the event is triggered. |

**Returns:** `void`

___
<a id="onunexpectedtoken"></a>

###  onUnexpectedToken

▸ **onUnexpectedToken**(event: *`function`*): `void`

*Defined in index.ts:256*

Event triggered when an unexpected token is identified.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| event | `function` |  function that will be called when the event is triggered. |

**Returns:** `void`

___
<a id="sendmessage"></a>

###  sendMessage

▸ **sendMessage**(message: *`string`*, delay?: *`number`*): `Promise`<`void`>

*Defined in index.ts:138*

Sends message to the stranger. A delay between keystrokes can be given. This delay is so that the information "Stranger is typing..." is displayed for a given amount of time.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| message | `string` | - |  String that will be written down in the text area and sent to the stranger |
| `Default value` delay | `number` | 50 |  Optional parameter corresponding to the number of milliseconds separating each keystroke. |

**Returns:** `Promise`<`void`>

___
<a id="solvecaptcha"></a>

###  solveCaptcha

▸ **solveCaptcha**(solvedCaptcha: *`string`*): `Promise`<`void`>

*Defined in index.ts:164*

Solves the captcha currently on the page according to the solvedCaptcha response. If you do not know how to get a solved captcha, I recommend using the [Handler.solveCaptchaWith2CaptchaApiKey](_index_.handler.md#solvecaptchawith2captchaapikey) function which makes use of the 2captcha API. Any other API will work as well.

**Parameters:**

| Name | Type |
| ------ | ------ |
| solvedCaptcha | `string` |

**Returns:** `Promise`<`void`>

___
<a id="solvecaptchawith2captchaapikey"></a>

###  solveCaptchaWith2CaptchaApiKey

▸ **solveCaptchaWith2CaptchaApiKey**(captchaIdentifier: *`string`*, twoCaptchaAPIKey: *`string`*): `Promise`<`void`>

*Defined in index.ts:155*

Solves the captcha using the 2captcha API. Returns a promise that resolves when the captcha has been solved.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| captchaIdentifier | `string` |  String that identifies the captcha |
| twoCaptchaAPIKey | `string` |  The API key that 2captcha has provided. |

**Returns:** `Promise`<`void`>

___
<a id="startconversation"></a>

###  startConversation

▸ **startConversation**(conversationType: *"text"*, topics?: *`string`[]*, cookiesFilePath?: *`undefined` \| `string`*): `Promise`<`void`>

▸ **startConversation**(conversationType: *"video"*, videoPath: *`string`*, topics?: *`string`[]*, cookiesFilePath?: *`undefined` \| `string`*): `Promise`<`void`>

*Defined in index.ts:37*

Starts a new conversation. Opens a new browser if the instance has no currently opened browser.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| conversationType | "text" |  String parameter: either "text" or "video". If the video is specified, an **absolute** video path must be provided as third parameter |
| `Optional` topics | `string`[] |  Optional parameter containing a list of strings that will be used as topics for the conversation. |
| `Optional` cookiesFilePath | `undefined` \| `string` |

**Returns:** `Promise`<`void`>

*Defined in index.ts:47*

Starts a new conversation. Opens a new browser if the instance has no currently opened browser.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| conversationType | "video" |  String parameter: either "text" or "video". If the video is specified, an **absolute** video path must be provided as third parameter |
| videoPath | `string` |  **absolute** path to the video file to be used in case a video conversation is started. |
| `Optional` topics | `string`[] |  Optional parameter containing a list of strings that will be used as topics for the conversation. |
| `Optional` cookiesFilePath | `undefined` \| `string` |

**Returns:** `Promise`<`void`>

___

## Object literals

<a id="__conversationfailsafe"></a>

### `<Private>` __conversationFailSafe

**__conversationFailSafe**: *`object`*

*Defined in index.ts:24*

<a id="__conversationfailsafe.connected"></a>

####  connected

**● connected**: *`false`* = false

*Defined in index.ts:24*

___
<a id="__conversationfailsafe.id"></a>

####  id

**● id**: *`number`* = 0

*Defined in index.ts:24*

___

___

