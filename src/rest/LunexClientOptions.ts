import { shouldRetry as defaultShouldRetry } from "../policies/retry-policy";
import { delay as defaultDelay } from "../utils/delay-utils";

type ShouldRetryFn = (response: Response) => boolean;
type OnRequestStartFn = (method: string, url: string, options: RequestInit) => void;
type OnRequestEndFn = (response: Response) => void;
type OnRequestErrorFn = (error: any) => void;
type DelayFn = (ms: number) => Promise<void>;

interface LunexClientOptionsConfig {
    timeout?: number;
    maxRetries?: number;
    shouldRetry?: ShouldRetryFn;
    delayFn?: DelayFn;
    onRequestStart?: OnRequestStartFn | null;
    onRequestEnd?: OnRequestEndFn | null;
    onRequestError?: OnRequestErrorFn | null;
}

/**
 * Configuration options for the LunexClient.
 * 
 * Enables customization of:
 * - Request timeout duration (in milliseconds).
 * - Number of retry attempts on transient errors.
 * - Retry decision logic based on the response.
 * - Lifecycle hooks to tap into request start, completion, and error events.
 */
class LunexClientOptions {
    /** Request timeout in milliseconds before aborting. Default: 10000 (10 seconds) */
    timeout: number;

    /** Maximum retry attempts on transient errors (like HTTP 502, 503, 504). Default: 0 (no retries) */
    maxRetries: number;

    /**
     * Function that decides if a retry should happen based on the HTTP response.
     * Defaults to retry on status 502, 503, and 504.
     */
    shouldRetry: ShouldRetryFn;

    /**
     * Custom async delay function used to wait between retries.
     * Receives the delay time in milliseconds.
     * Defaults to a standard delay implementation using setTimeout.
     */
    delayFn: DelayFn;
    
    /**
     * Optional callback triggered before a request is sent.
     * Receives HTTP method, request URL, and request options.
     */
    onRequestStart: OnRequestStartFn | null;

    /**
     * Optional callback triggered after a response is received.
     * Receives the response object.
     */
    onRequestEnd: OnRequestEndFn | null;

    /**
     * Optional callback triggered if a request error occurs.
     * Receives the error object.
     */
    onRequestError: OnRequestErrorFn | null;
    
    /**
     * Creates an instance of LunexClientOptions.
     * 
     * @param {Object} [config={}] Configuration options.
     * @param {number} [config.timeout=10000] Timeout in milliseconds.
     * @param {number} [config.maxRetries=0] Number of retries on transient errors.
     * @param {ShouldRetryFn} [config.shouldRetry] Retry decision function.
     * @param {DelayFn} [config.delayFn] Custom async delay function for retry backoff.
     * @param {OnRequestStartFn|null} [config.onRequestStart] Hook before request start.
     * @param {OnRequestEndFn|null} [config.onRequestEnd] Hook after request end.
     * @param {OnRequestErrorFn|null} [config.onRequestError] Hook on request error.
     */
    constructor({
        timeout = 10000,
        maxRetries = 0,
        shouldRetry = defaultShouldRetry,
        delayFn = defaultDelay,
        onRequestStart = null,
        onRequestEnd = null,
        onRequestError = null
    }: LunexClientOptionsConfig = {}) {
        this.timeout = timeout;
        this.maxRetries = maxRetries;
        this.shouldRetry = shouldRetry;
        this.delayFn = delayFn;
        this.onRequestStart = onRequestStart;
        this.onRequestEnd = onRequestEnd;
        this.onRequestError = onRequestError;
    }
}

export default LunexClientOptions;