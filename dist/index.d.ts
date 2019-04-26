import { Browser, Page } from "puppeteer";
export declare class Handler {
    browser?: Browser;
    page?: Page;
    puppeteerOptions: {};
    private __onError?;
    private __onConnected?;
    private __onMessageReceived?;
    private __onDisconnected?;
    private __onCaptcha?;
    private __onInformation?;
    private __onUnexpectedToken?;
    private __onMessageSent?;
    private __conversationFailSafe;
    constructor(options: {});
    /**
     * Starts a new conversation. Opens a new browser if the instance has no currently opened browser.
     * @param conversationType String parameter: either "text" or "video". If the video is specified, an **absolute** video path must be provided as third parameter
     * @param topics Optional parameter containing a list of strings that will be used as topics for the conversation.
     * @param cookies Optional parameter corresponding to the location of a cookie file for the browser. If no parameter is set, no cookie file will be used.
     * If the cookie file doesn't exist it will be created. Make sure the directory containing said file exists. Cookies will be rewritten on every new conversation.
     */
    startConversation(conversationType: "text", topics?: string[], cookiesFilePath?: string): Promise<void>;
    /**
     * Starts a new conversation. Opens a new browser if the instance has no currently opened browser.
     * @param conversationType String parameter: either "text" or "video". If the video is specified, an **absolute** video path must be provided as third parameter
     * @param videoPath **absolute** path to the video file to be used in case a video conversation is started.
     * @param topics Optional parameter containing a list of strings that will be used as topics for the conversation.
     * @param cookies Optional parameter corresponding to the location of a cookie file for the browser. If no parameter is set, no cookie file will be used.
     * If the cookie file doesn't exist it will be created. Make sure the directory containing said file exists. Cookies will be rewritten on every new conversation.
     */
    startConversation(conversationType: "video", videoPath: string, topics?: string[], cookiesFilePath?: string): Promise<void>;
    /**
     * Closes the browser.
     */
    exit: () => Promise<void>;
    /**
     * Sends message to the stranger. A delay between keystrokes can be given.
     * This delay is so that the information "Stranger is typing..." is displayed for a given amount of time.
     * @param message String that will be written down in the text area and sent to the stranger
     * @param delay Optional parameter corresponding to the number of milliseconds separating each keystroke.
     */
    sendMessage: (message: string, delay?: number) => Promise<void>;
    /**
     * Solves the captcha using the 2captcha API. Returns a promise that resolves when the captcha has been solved.
     * @param captchaIdentifier String that identifies the captcha
     * @param twoCaptchaAPIKey The API key that 2captcha has provided.
     */
    solveCaptchaWith2CaptchaApiKey: (captchaIdentifier: string, twoCaptchaAPIKey: string) => Promise<void>;
    /**
     * Solves the captcha currently on the page according to the solvedCaptcha response. If you do not know how to get a solved captcha, I recommend using the
     *  {@link Handler.solveCaptchaWith2CaptchaApiKey} function which makes use of the 2captcha API. Any other API will work as well.
     */
    solveCaptcha: (solvedCaptcha: string) => Promise<void>;
    /**
     * Event triggered when the user is connected to a chatroom.
     * @param event function that will be called when the event is triggered.
     */
    onConnected: (event: () => any) => void;
    /**
     * Event triggered when the stranger sent a message.
     * @param event function that will be called when the event is triggered.
     */
    onMessageReceived: (event: (message: string) => any) => void;
    /**
     * Event triggered when the user is disconnected from the chatroom.
     * @param event function that will be called when the event is triggered.
     */
    onDisconnected: (event: () => any) => void;
    /**
     * Event triggered when a captcha needs to be solved in order to access the chatroom.
     * @param event function that will be called when the event is triggered.
     */
    onCaptcha: (event: (captchaID: string) => any) => void;
    /**
     * Event triggered when the an information is given.
     * @param event function that will be called when the event is triggered.
     */
    onInformation: (event: (information: string) => any) => void;
    /**
     * Event triggered when the chatroom raises an error.
     * @param event function that will be called when the event is triggered.
     */
    onError: (event: (error: string) => any) => void;
    /**
     * Event triggered when an unexpected token is identified.
     * @param event function that will be called when the event is triggered.
     */
    onUnexpectedToken: (event: (unexpectedToken: string) => any) => void;
    /**
     * Event triggered when the user sent a message. Used to verify that the message has been delivered.
     * @param event function that will be called when the event is triggered.
     */
    onMessageSent: (event: (message: string) => any) => void;
    private __observeLogs;
}
