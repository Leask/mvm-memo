import * as  coder from './coder.mjs';

const OPERATION_PURPOSES = {
    OPERATION_PURPOSE_UNKNOWN: 0,
    OPERATION_PURPOSE_GROUP_EVENT: 1,
    OPERATION_PURPOSE_ADD_PROCESS: 11,
    OPERATION_PURPOSE_CREDIT_PROCESS: 12,
};

const RULES = [
    { type: 'INT', name: 'purpose' },
    { type: 'UUID', name: 'process' },
    { type: 'BYTES', name: 'platform' },
    { type: 'BYTES', name: 'address' },
    { type: 'BYTES', name: 'extra' },
];

const encoding = 'base64url';

const encode = (memo, options) => {
    memo = memo || {};
    memo.purpose = ~~OPERATION_PURPOSES[String(memo.purpose).toUpperCase()];
    return coder.encode(RULES, memo, { encoding, ...options || {} });
};

export {
    OPERATION_PURPOSES,
    RULES,
    encode,
};
