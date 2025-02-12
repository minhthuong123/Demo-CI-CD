const path = require('path');
const { browser, driver } = require('@wdio/globals');
const { CONFIG } = require('./config/config.properties');
const DynamicEnvUtil = require('./src/core/utils/DynamicEnvUtil');
const consts = require('./consts/Consts.js');
const allure = require('allure-commandline');
const FileUtil = require('./src/core/utils/FileUtil.js');
const allure_report = require('@wdio/allure-reporter').default;

let ibrowser = '';
let ichromeoption = '';
let ifirefoxoption = '';
DynamicEnvUtil.initConfig();
DynamicEnvUtil.checkBrowserMode();
DynamicEnvUtil.checkRunnerMode();
DynamicEnvUtil.checkHeadlessMode();
DynamicEnvUtil.checkEnvMode();

const prefs = {
  'download.default_directory': path.join(process.cwd(), 'src', 'data', 'web', 'download')
};

if (process.env.BROWSER == 'chrome') {
  if (process.env.HEADLESS == 'true') {
    ichromeoption = {
      args: [
        '--headless=true',
        '--window-size=1920,2160',
        '--disable-extensions',
        '--disable-features=VizDisplayCompositor',
        'disable-gpu',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--enable-features=NetworkService'
      ],
      prefs: prefs
    };
  } else {
    ichromeoption = {
      prefs: prefs
    };
  }
  ibrowser = 'chrome';
} else if (process.env.BROWSER == 'chromium') {
  if (process.env.HEADLESS == 'true') {
    ichromeoption = {
      args: [
        'headless',
        '--window-size=1920,2160',
        '--disable-extensions',
        '--disable-features=VizDisplayCompositor',
        'disable-gpu',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--enable-features=NetworkService'
      ]
    };
  }
  ibrowser = 'chromium';
} else {
  if (process.env.HEADLESS == 'true') {
    ifirefoxoption = {
      args: [
        '--headless',
        '--window-size=1920,2160',
        '--disable-extensions',
        '--disable-features=VizDisplayCompositor',
        'disable-gpu',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--enable-features=NetworkService'
      ]
    };
  }
  ibrowser = 'firefox';
}

exports.config = {
  // ====================
  // Runner Configuration
  // ====================

  runner: 'local',
  // hostname: 'localhost',
  // port: 4322,
  // path: '/',
  // sync: true,
  logLevel: CONFIG.wdioLogLevel,

  // ==================
  // Specify Test Files
  // ==================

  specs: [CONFIG.features],
  suites: CONFIG.suites,


  // =====================================
  // Service Configurations & Capabilities
  // =====================================

  // configs: [DynamicEnvUtil.initConfig()],

  // services: [DynamicEnvUtil.initServices()],

  // capabilities: [DynamicEnvUtil.initDriver()],

  capabilities: [
    {
      browserName: ibrowser,
      'goog:chromeOptions': ichromeoption,
      'moz:firefoxOptions': ifirefoxoption
    }
  ],

  maxInstances: CONFIG.maxInstances,

  // ===================
  // Test Configurationsxxx
  // ===================

  // If you only want to run your tests until a specific amount of tests have failed use
  bail: 0,

  // Set a base URL in order to shorten url command calls.
  baseUrl: 'http://localhost',

  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,

  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,

  // Default request retries count
  connectionRetryCount: CONFIG.retryFails,

  // Framework you want to run your specs with.
  framework: 'cucumber',

  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,

  // Delay in seconds between the spec file retry attempts
  // specFileRetriesDelay: 0,

  // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
  // specFileRetriesDeferred: false,

  // =======================
  // Cucumber Configurations
  // =======================
  // If you are using Cucumber you need to specify the location of your step definitions.
  cucumberOpts: {
    require: ['./src/step_definitions/**/*.js'],
    // <boolean> show full backtrace for errors
    backtrace: true,
    // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    requireModule: [],
    // <boolean> invoke formatters without executing steps
    dryRun: false,
    // <boolean> abort the run on first failure
    failFast: true,
    // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    format: ['pretty'],
    // <boolean> hide step definition snippets for pending steps
    snippets: true,
    // <boolean> hide source uris
    source: true,
    // <string[]> (name) specify the profile to use
    profile: [],
    // <boolean> fail if there are any undefined or pending steps
    strict: false,
    // <string> (expression) only execute the features or scenarios with tags matching the expression
    tagExpression: '',
    // <number> timeout for step definitions
    timeout: 121000,
    // <boolean> Enable this config to treat undefined definitions as warnings.
    ignoreUndefinedDefinitions: false,
    scenarioLevelReporter: false,
    retry: CONFIG.retryFails,
    ignoreUncaughtExceptions: true
  },

  // ========================
  //   Reports Configurations
  // ========================
  reporters: [
    [
      'cucumberjs-json',
      {
        jsonFolder: '.tmp/json/',
        language: 'en'
      }
    ],
    [
      'allure',
      {
        outputDir: consts.ALLURE_RESULTS_ROOT,
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: true,
        // disableMochaHooks: true,
        // addConsoleLogs: true
        reportedEnvironmentVars: {
          BROWSER: process.env.BROWSER,
          ENV: process.env.ENV
          // 'TENANT': process.env.TENANT,
        }
      }
    ],
    [
      'junit',
      {
        outputDir: './',
        outputFileFormat: function (options) {
          // optional
          return `reports/xml/${global.file_run_name}.xml`;
        }
      }
    ]
  ],
  // reporters: ['spec'],

  // =====================
  // Hooks
  // =====================

  onPrepare: function (config, capabilities) {
    if (CONFIG.clearAllureResultFolder) {
      FileUtil.deleteFolder(consts.ALLURE_RESULTS_ROOT);
    }
    console.log('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■');
    console.log('                       START TESTING');
    console.log('. TEST INFORMATION:');
    console.log('. Test Runner   :', process.env.RUNNER);
    console.log('. Test Env      :', process.env.ENV);
    console.log('. Test Browser  :', process.env.BROWSER + '    | Headless: ' + process.env.HEADLESS);
    if (process.env.KEGMIL_URL) {
      console.log('. URL           :', process.env.KEGMIL_URL);
    }
    console.log('. Instances     :', CONFIG.maxInstances + '         | RetryFails: ' + CONFIG.retryFails);
    console.log('\n');
  },

  beforeSession: function (config, capabilities, specs) {
    var path_names;
    if (specs[0].includes('\\')) {
      path_names = specs[0].split('\\');
    } else {
      path_names = specs[0].split('/');
    }
    let file_run_name = path_names[path_names.length - 1];
    global.file_run_name = file_run_name;
  },

  before: async function (test, context, options, capabilities) {
    if (process.env.RUNNER == 'ci' || process.env.HEADLESS == true) {
      browser.setWindowSize(1920, 1520);
    }

    browser.maximizeWindow();
  },
  afterHook: function (test, context) {},

  after: function () {},

  afterSession: function (options, capabilities) {},

  /**
   * Cucumber Hooks
   */
  beforeFeature: function (uri, feature) {},

  beforeScenario: function (world) {},

  beforeStep: function (step, scenario) {},

  afterStep: async function (step, scenario, result) {
    if (!result.passed) {
      console.log('\t\t-> Fail on step:', step.text);
      await browser.saveScreenshot('./reports/screenshot/' + file_run_name + '.png');
    }
  },

  afterScenario: async function (world, result) {},

  afterFeature: function (uri, feature) {},

  onComplete: function (config) {
    console.log('\n');
    console.log('                       END TESTING');
    console.log('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■');

    if (CONFIG.allure_report) {
      console.log('. Allure Autogenerate Report ............');
      const reportError = new Error('Could not generate Allure report');
      const generation = allure(['generate', consts.ALLURE_RESULTS_ROOT, '--clean']);
      return new Promise((resolve, reject) => {
        const generationTimeout = setTimeout(() => reject(reportError), 120000);
        generation.on('exit', function (exitCode) {
          clearTimeout(generationTimeout);

          if (exitCode !== 0) {
            return reject(reportError);
          }
          resolve();
        });
      });
    }
  }
};
