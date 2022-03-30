const HEX = 'hex';

const verifyUuid = (uuid) => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        uuid
    );
};

const assert = (condition, message) => {
    if (!condition) { throw new Error(message); }
};

const assertUuid = (uuid) => assert(verifyUuid(uuid), `Invalid UUID.`);

const compactUuid = (uuid) => uuid.replace(/\-/ig, '');

const writeInt = (buf, value) => {
    const tmpBuf = Buffer.alloc(2);
    tmpBuf.writeInt16BE(value);
    return Buffer.concat([buf, tmpBuf]);
};

const writeUuid = (buf, uuid) => {
    assertUuid(uuid);
    const tmpBuf = Buffer.from(compactUuid(uuid), HEX);
    return Buffer.concat([buf, tmpBuf]);
};

const writeBytes = (buf, bytes) => {
    let tmpBuf = bytes;
    if (!Buffer.isBuffer(tmpBuf)) {
        tmpBuf = Buffer.from(String(tmpBuf), HEX);
    }
    buf = writeInt(buf, tmpBuf.length);
    return Buffer.concat([buf, tmpBuf]);
};

const encode = (rule, memo, options) => {
    let buf = Buffer.alloc(0);
    for (let i in rule) {
        const value = memo[rule[i].name];
        switch (rule[i].type) {
            case 'INT':
                buf = writeInt(buf, value);
                break;
            case 'UUID':
                buf = writeUuid(buf, value);
                break;
            case 'BYTES':
                buf = writeBytes(buf, value);
                break;
        }
    }
    return options?.encoding ? buf.toString(options?.encoding) : buf;
};

export {
    assertUuid,
    encode,
    verifyUuid,
    writeBytes,
    writeInt,
    writeUuid,
};
