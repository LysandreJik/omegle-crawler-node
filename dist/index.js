"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = require("puppeteer");
const fs_1 = require("fs");
const node_fetch_1 = require("node-fetch");
const videoOptions = (videoPath) => [
    "--use-fake-ui-for-media-stream",
    "--use-fake-device-for-media-stream",
    `--use-file-for-fake-video-capture=${videoPath}`
];
class Handler {
    constructor(options) {
        this.__conversationFailSafe = { id: 0, connected: false };
        /**
         * Closes the browser.
         */
        this.exit = async () => {
            if (this.browser) {
                this.browser.close();
            }
        };
        /**
         * Sends message to the stranger. A delay between keystrokes can be given.
         * This delay is so that the information "Stranger is typing..." is displayed for a given amount of time.
         * @param message String that will be written down in the text area and sent to the stranger
         * @param delay Optional parameter corresponding to the number of milliseconds separating each keystroke.
         */
        this.sendMessage = async (message, delay = 50) => {
            if (!this.page) {
                throw new Error("Can't send message if page is not initialized. Please initialize the page beforehand using the init() method.");
            }
            await this.page.type(".chatmsg", message, { delay: 50 });
            await this.page.keyboard.press("Enter");
            if (this.__onMessageSent) {
                this.__onMessageSent(message);
            }
        };
        /**
         * Solves the captcha using the 2captcha API. Returns a promise that resolves when the captcha has been solved.
         * @param captchaIdentifier String that identifies the captcha
         * @param twoCaptchaAPIKey The API key that 2captcha has provided.
         */
        this.solveCaptchaWith2CaptchaApiKey = async (captchaIdentifier, twoCaptchaAPIKey) => {
            const solvedCaptcha = await captchaSolver(captchaIdentifier, twoCaptchaAPIKey);
            await this.solveCaptcha(solvedCaptcha);
        };
        /**
         * Solves the captcha currently on the page according to the solvedCaptcha response. If you do not know how to get a solved captcha, I recommend using the
         *  {@link Handler.solveCaptchaWith2CaptchaApiKey} function which makes use of the 2captcha API. Any other API will work as well.
         */
        this.solveCaptcha = async (solvedCaptcha) => {
            if (!this.page) {
                throw new Error("Page was not initialized. Please initialize the page before trying to solve the captcha.");
            }
            await this.page.waitForSelector("#g-recaptcha-response");
            await this.page.click("#g-recaptcha-response");
            await this.page.keyboard.type(solvedCaptcha);
            await this.page.evaluate(solvedCaptcha => {
                // Typing the captcha solution we received from repatcha.
                const googleCaptchaConfig = window["___grecaptcha_cfg"].clients[0];
                // This code finds the callback function within the web page.
                // The object '___grecaptcha_cfg' has obfuscated attributes that change regularly.
                // It is therefore important not to rely on the naming of those objects, but to rely on the callback function whose name does not change.
                // This sends the data that we filled in the text area to google and validates the Captcha.
                const findObject = (object, name) => {
                    for (const key in object) {
                        if (Object.keys(object[key]).includes(name)) {
                            return object[key][name];
                        }
                        else if (typeof object[key] === "object") {
                            const res = findObject(object[key], name);
                            if (res) {
                                return res;
                            }
                        }
                    }
                };
                const callback = findObject(googleCaptchaConfig, "callback");
                callback(solvedCaptcha);
            }, solvedCaptcha);
        };
        /**
         * Event triggered when the user is connected to a chatroom.
         * @param event function that will be called when the event is triggered.
         */
        this.onConnected = (event) => {
            this.__onConnected = () => {
                event();
                this.__conversationFailSafe = { id: this.__conversationFailSafe.id + 1, connected: true };
            };
        };
        /**
         * Event triggered when the stranger sent a message.
         * @param event function that will be called when the event is triggered.
         */
        this.onMessageReceived = (event) => {
            this.__onMessageReceived = event;
        };
        /**
         * Event triggered when the user is disconnected from the chatroom.
         * @param event function that will be called when the event is triggered.
         */
        this.onDisconnected = (event) => {
            this.__onDisconnected = event;
        };
        /**
         * Event triggered when a captcha needs to be solved in order to access the chatroom.
         * @param event function that will be called when the event is triggered.
         */
        this.onCaptcha = (event) => {
            this.__onCaptcha = (captchaID) => {
                event(captchaID);
                this.__conversationFailSafe.connected = true;
            };
        };
        /**
         * Event triggered when the an information is given.
         * @param event function that will be called when the event is triggered.
         */
        this.onInformation = (event) => {
            this.__onInformation = event;
        };
        /**
         * Event triggered when the chatroom raises an error.
         * @param event function that will be called when the event is triggered.
         */
        this.onError = (event) => {
            this.__onError = event;
        };
        /**
         * Event triggered when an unexpected token is identified.
         * @param event function that will be called when the event is triggered.
         */
        this.onUnexpectedToken = (event) => {
            this.__onUnexpectedToken = event;
        };
        /**
         * Event triggered when the user sent a message. Used to verify that the message has been delivered.
         * @param event function that will be called when the event is triggered.
         */
        this.onMessageSent = (event) => {
            this.__onMessageSent = event;
        };
        this.__observeLogs = async (info) => {
            const informationType = info.text().substring(0, 5);
            const message = info.text().substr(5);
            switch (informationType) {
                case "<con>":
                    if (this.__onConnected) {
                        await this.__onConnected();
                    }
                    break;
                case "<msg>":
                    if (this.__onMessageReceived) {
                        await this.__onMessageReceived(message);
                    }
                    break;
                case "<dis>":
                    if (this.__onDisconnected) {
                        await this.__onDisconnected();
                    }
                    break;
                case "<log>":
                    if (this.__onInformation) {
                        await this.__onInformation(message);
                    }
                    break;
                case "<err>":
                    if (this.__onError) {
                        await this.__onError(message);
                    }
                    break;
                case "<cap>":
                    if (this.__onCaptcha) {
                        await this.__onCaptcha(message);
                    }
                    break;
                case "Error":
                    if (this.__onUnexpectedToken) {
                        await this.__onUnexpectedToken(message);
                    }
                    break;
                default:
                    if (this.__onUnexpectedToken) {
                        await this.__onUnexpectedToken(message);
                    }
                    break;
            }
        };
        this.puppeteerOptions = options;
    }
    async startConversation(conversationType, arg1, arg2, arg3) {
        let topics;
        let videoPath;
        let cookiesFilePath;
        if (conversationType === "video") {
            videoPath = arg1;
            topics = arg2;
            cookiesFilePath = arg3;
        }
        else {
            topics = arg1;
            cookiesFilePath = arg2;
        }
        if (!this.browser) {
            if (conversationType === "video") {
                const args = this.puppeteerOptions.args
                    ? [...this.puppeteerOptions.args, ...videoOptions(videoPath)]
                    : videoOptions(videoPath);
                this.puppeteerOptions = { ...this.puppeteerOptions, args };
            }
            this.browser = await puppeteer_1.launch(this.puppeteerOptions);
        }
        if (!this.page) {
            [this.page] = await this.browser.pages();
            if (cookiesFilePath) {
                try {
                    if (fs_1.existsSync(cookiesFilePath)) {
                        const cookies = JSON.parse(fs_1.readFileSync(cookiesFilePath, "utf-8"));
                        await this.page.setCookie(...cookies);
                    }
                }
                catch (e) {
                    if (e)
                        console.error("Error loading cookies", e);
                }
            }
            try {
                const cookies = JSON.parse(fs_1.readFileSync("./cookies", "utf-8"));
                await this.page.setCookie(...cookies);
            }
            catch (e) {
                console.log("No cookies were found");
            }
        }
        if (cookiesFilePath) {
            const cookies = await this.page.cookies();
            fs_1.writeFileSync(cookiesFilePath, JSON.stringify(cookies));
        }
        this.page
            .removeAllListeners()
            .on("console", this.__observeLogs)
            .on("dialog", dialog => dialog.accept());
        if (this.page.url() === "https://www.omegle.com") {
            await this.page.waitFor(1000);
            await this.page.keyboard.press("escape");
        }
        else {
            await this.page.goto("https://www.omegle.com", { timeout: 0 });
            if (topics) {
                const topicsSelector = ".newtopicinput";
                await this.page.waitForSelector(topicsSelector);
                await this.page.click(topicsSelector);
                for (const topic of topics) {
                    if (this.page) {
                        await this.page.keyboard.type(topic);
                        await this.page.keyboard.press("Enter");
                    }
                }
            }
        }
        const chatTypeSelector = conversationType === "text" ? "#chattypetextcell" : "#chattypevideocell";
        await this.page.waitForSelector(chatTypeSelector);
        await this.page.click(chatTypeSelector);
        await this.page.evaluate(mutationObserver);
    }
}
exports.Handler = Handler;
async function mutationObserver() {
    let lastMessage = "";
    let lastLogMessage = "";
    let connectedToStranger = false;
    let loggedCaptcha = false;
    const observer = new MutationObserver(() => {
        const strangerMessages = document.getElementsByClassName("strangermsg");
        const logMessages = document.getElementsByClassName("statuslog");
        const logItems = document.getElementsByClassName("logitem");
        if (logItems && logItems[0].innerHTML.includes("https://www.google.com/recaptcha/api2") && !loggedCaptcha) {
            // Get the IFrame source that contains the captcha identifier.
            const iFrameSrc = logItems[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].src;
            const iFrameSrcArguments = iFrameSrc.split("&");
            // Find the captcha ID
            iFrameSrcArguments.forEach(argument => {
                if (argument.includes("k=")) {
                    console.log("<cap>" + argument.substr(2));
                    loggedCaptcha = true;
                }
            });
            // Set the text area to visible, so that we can enter the response
            const textArea = document.getElementById("g-recaptcha-response");
            if (textArea) {
                textArea.style.removeProperty("display");
            }
        }
        if (strangerMessages.length && lastMessage != strangerMessages[strangerMessages.length - 1].innerText) {
            lastMessage = strangerMessages[strangerMessages.length - 1].innerText;
            console.log("<msg>" + lastMessage.substring(10));
        }
        const logFilter = ["You both like", "Omegle couldn't find"];
        if (logMessages.length && lastLogMessage != logMessages[logMessages.length - 1].innerText) {
            let logInFilter = false;
            logFilter.forEach(logString => {
                logMessages[logMessages.length - 1].innerText.includes(logString) ? (logInFilter = true) : "";
            });
            if (logInFilter) {
                lastLogMessage = logMessages[logMessages.length - 1].innerText;
                logFilter.forEach(logString => (lastLogMessage.includes(logString) ? console.log("<log>" + lastLogMessage) : ""));
            }
        }
        Array.from(logMessages).forEach(element => {
            if (element.innerHTML === "Error connecting to server. Please try again.") {
                console.log("<err>Connection to server blocked.");
            }
            if (element.innerHTML === "Stranger has disconnected.") {
                console.log("<dis>Disconnected");
            }
            if (!connectedToStranger && element.innerHTML.includes("You're now chatting with")) {
                console.log("<con>Connected.");
                connectedToStranger = true;
            }
        });
    });
    const config = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
    };
    try {
        observer.observe(document.getElementsByClassName("logbox")[0], config);
    }
    catch (err) {
        console.error("Error while attaching observer", err);
    }
}
async function captchaSolver(captchaIdentifier, twoCaptchaAPIKey) {
    const request = "http://2captcha.com/in.php?key=" +
        twoCaptchaAPIKey +
        "&method=userrecaptcha&googlekey=" +
        captchaIdentifier +
        "&json=true&pageurl=http://omegle.com";
    const result = await node_fetch_1.default(request);
    const resultJSON = await result.json();
    const requestID = resultJSON.request;
    let captchaInterval;
    const solvedCaptcha = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            const responseRequest = "http://2captcha.com/res.php?key=" + twoCaptchaAPIKey + "&action=get&id=" + requestID + "&json=true";
            let responseResult = await node_fetch_1.default(responseRequest);
            let responseJSON = await responseResult.json();
            let response = responseJSON.request;
            if (response == "CAPCHA_NOT_READY") {
                captchaInterval = setInterval(async () => {
                    responseResult = await node_fetch_1.default(responseRequest);
                    responseJSON = await responseResult.json();
                    response = responseJSON.request;
                    if (response !== "CAPCHA_NOT_READY") {
                        if (captchaInterval) {
                            clearInterval(captchaInterval);
                        }
                        resolve(response);
                    }
                }, 15000);
            }
            else if (response === "CAPCHA_NOT_SOLVABLE") {
                reject(response());
            }
            else {
                if (captchaInterval) {
                    clearInterval(captchaInterval);
                }
                resolve(response);
            }
        }, 30000);
    });
    return solvedCaptcha;
}
