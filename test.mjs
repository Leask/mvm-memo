import { operation } from './index.mjs';

const tests = [{
    func: operation.encode,
    imput: {
        purpose: 'OPERATION_PURPOSE_GROUP_EVENT',
        process: '9a34bd64-afcb-11ec-b909-0242ac120002',
        extra: '01ed9b9ba580000000000000000000000000000000000000000e35fd4acef14e2b00b9d0cd000000000000000000000000',
    },
    respected: 'AAGaNL1kr8sR7LkJAkKsEgACAAAAAAAxAe2bm6WAAAAAAAAAAAAAAAAAAAAAAAAAAA41_UrO8U4rALnQzQAAAAAAAAAAAAAAAA',
}, {
    func: operation.encode,
    imput: {
        purpose: 'OPERATION_PURPOSE_ADD_PROCESS',
        process: '80c799f8-afdc-11ec-b909-0242ac120002',
        platform: 'quorum',
        address: '0xF0E75E53f0XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        extra: Buffer.from('0x2df088da5a766320e3f71XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'utf8'),
    },
    respected: 'AAuAx5n4r9wR7LkJAkKsEgACAAZxdW9ydW0AKjB4RjBFNzVFNTNmMFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWABCMHgyZGYwODhkYTVhNzY2MzIwZTNmNzFYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhY',
}];

for (let i in tests) {
    const result = tests[i].func(tests[i].imput);
    console.log(`Test ${~~i + 1} / ${tests.length}: ${result.substr(0, 60)}... => ${result === tests[i].respected}`);
}
