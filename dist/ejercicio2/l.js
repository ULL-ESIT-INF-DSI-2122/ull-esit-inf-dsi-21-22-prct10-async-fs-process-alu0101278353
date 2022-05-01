"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fileName = process.argv[2];
const cat = (0, child_process_1.spawn)('cat', [fileName]);
const wc = (0, child_process_1.spawn)('wc', ['-l']);
cat.stdout.pipe(wc.stdin);
let wcOutput = '';
wc.stdout.on('data', (piece) => {
    wcOutput += piece;
});
wc.on('close', () => {
    process.stdout.write(wcOutput);
});
//# sourceMappingURL=l.js.map