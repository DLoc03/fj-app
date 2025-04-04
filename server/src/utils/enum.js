export const ERROR_CODE = {
    DONE: 0,
    FAILED: 1,
    UNAUTHORIZED: 2,
    BAD_REQUEST: 3,
    SERVER_ERROR: 4
}

export const STATUS = {
    DONE: 'Done',
    CREATED: 'Created',
    FAILED: 'Failed',
    NOT_FOUND: "Not found"
}


export const QUEUE_NAME = {
    AUDIT: 'auditlogs',
    SEARCH: 'searchlogs'
}

export const RABBIT_EVENTS = {
    ERROR: 'error',
    CLOSE: 'close',

}

export const REDIS_EVENTS = {
    CACHE_HIT: "CACHE_HIT",
    CACHE_MISS: "CACHE_MISS",
    CACHE_SET: "CACHE_SET",
    CACHE_DELETE: "CACHE_DELETE",
    CACHE_EXPIRED: "CACHE_EXPIRED",
    RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
    SESSION_CREATED: "SESSION_CREATED",
    SESSION_EXPIRED: "SESSION_EXPIRED",
    JOB_QUEUED: "JOB_QUEUED",
    JOB_PROCESSING: "JOB_PROCESSING",
    JOB_COMPLETED: "JOB_COMPLETED",
    JOB_FAILED: "JOB_FAILED",
    REDIS_CONNECTION_ERROR: "REDIS_CONNECTION_ERROR",
    REDIS_COMMAND_ERROR: "REDIS_COMMAND_ERROR",
    REDIS_TIMEOUT: "REDIS_TIMEOUT"
};
