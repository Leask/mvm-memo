# MVM-MEMO

Use to `Encode` and `Decode` memos in mvm invoking.

The goal is to be compatible with the [mvm go version](https://github.com/MixinNetwork/trusted-group/tree/master/mvm/encoding).

## How to use

### Install

```bash
npm install mvm-memo
```

### Use as a ES6 module

```javascript
import { operation } from 'mvm-memo';

const memo = operation.encode({
    purpose: 'OPERATION_PURPOSE_GROUP_EVENT',
    process: '9a34bd64-afcb-11ec-b909-0242ac120002',
    extra: '01ed9b9ba580000000000000000000000000000000000000000e35fd4acef14e2b00b9d0cd000000000000000000000000',
});
```

## TODO

[] Adding decoder for operation-coder
[] Support event-coder
