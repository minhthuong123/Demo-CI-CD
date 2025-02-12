const CONFIG = {
  // CONFIG STATIC RUNNER
  // Default: local run ci with prefix env=ci
  env: 'stag', // dev | stag | prod
  browser: 'chrome', // chrome | firefox | safari
  headless: false, // safari not support headless
  maxInstances: 3,
  wdioLogLevel: 'silent', //trace | debug | info | warn | error | silent
  logger: false,
  retryFails: 0, // Specify the number of times to retry failing test cases.
  clearAllureResultFolder: true,

  // TESTCASE RUN
  features: ['./src/specs/**'],
  suites: {
    regression: ['./src/specs_new/WebApp/Administration/**']
  },

  // CREATE TEST EXECUTION REPORT
  allure_report: true // true | false
};

exports.CONFIG = CONFIG;
