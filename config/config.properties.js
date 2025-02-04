const CONFIG = {

    // CONFIG STATIC RUNNER
    // Default: local run ci with prefix env=ci
    env: 'stag', // dev | stag | prod
    tenant: 'autos', // (stag|autos , prod|autoy)
    browser: 'chrome', // chrome | firefox | safari 
    headless: true, // safari not support headless
    maxInstances: 3,
    wdioLogLevel: 'silent', //trace | debug | info | warn | error | silent
    logger: false,
    retryFails: 0, // Specify the number of times to retry failing test cases.
    clearAllureResultFolder: true,

    // CONFIG MOBILE APP
    // Default: local run web app
    user_app: 'web_app', // web_app | mobile_app
    platformName: 'Android', // Android | iOS
    platformVersion: '12',
    deviceName: 'emulator-5556', // emulator-5556 | 192.168.1.83:9999 | real device: Samsung A51(R58NC22FF3H), Huawei(WCY7N18410007415), Vsmart (BKB00179209)


    // TESTCASE RUN
    features: [
        './src/specs/**'
    ],

    // CREATE TEST EXECUTION REPORT
    xray_report: false,  // true | false | Exist Test Execution: 'QA-725'
    allure_report: true // true | false

}

exports.CONFIG = CONFIG

