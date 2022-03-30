const [HEX, UTF8] = ['hex', 'utf8'];
const assert = (condition, msg) => { if (!condition) { throw new Error(msg) } };
const assertUuid = (uuid) => assert(verifyUuid(uuid), `Invalid UUID.`);
const compactUuid = (uuid) => uuid.replace(/\-/ig, '');
const writeString = (buf, bytes) => writeBuffer(buf, bytes, UTF8);
const writeBytes = (buf, bytes) => writeBuffer(buf, bytes, HEX);

const verifyUuid = (uuid) => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        uuid
    );
};

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

const writeBuffer = (buf, bytes, e) => {
    bytes = Buffer.isBuffer(bytes) ? bytes : Buffer.from(String(bytes || ''), e);
    buf = writeInt(buf, bytes.length);
    return Buffer.concat([buf, bytes]);
};

const encode = (rule, memo, options) => {
    let buf = Buffer.alloc(0);
    for (let i in rule) {
        const value = memo[rule[i].name];
        switch (rule[i].type) {
            case 'INT': buf = writeInt(buf, value); break;
            case 'UUID': buf = writeUuid(buf, value); break;
            case 'STRING': buf = writeString(buf, value); break;
            case 'BYTES': buf = writeBytes(buf, value); break;
            default: throw new Error('Invalid encoding type.');
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
