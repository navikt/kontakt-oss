const createTestCafe = require('testcafe');
let testcafe = null;

createTestCafe('localhost', 1337, 1338)
    .then(tc => {
        testcafe = tc;
        const runner = testcafe.createRunner();

        return runner
            .startApp('yarn mock', 5000)
            .src(['endeTilEndeTest/sendInnBesvarelse.test.ts'])
            .browsers(['chrome:headless'])
            .run();
    })
    .then(failedCount => {
        console.log('Tests failed: ' + failedCount);
        testcafe.close();
        process.exit(1);
    });
