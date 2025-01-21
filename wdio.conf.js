const path = require('path')
const { browser, driver } = require('@wdio/globals')
const { CONFIG } = require("./config/config.properties");
const DynamicEnvUtil = require("./src/core/utils/DynamicEnvUtil");
const consts = require('./consts/Consts.js');
const allure = require('allure-commandline');
const FileUtil = require('./src/core/utils/FileUtil.js')
// const { removeSync } = require('fs-extra');
const XrayUtil = require('./src/core/utils/XrayUtil.js');
// const ApiJobFlows = require('./src/api_module/ApiFlows/ApiJobFlows.js');
const allure_report = require('@wdio/allure-reporter').default

let ibrowser = ''
let ichromeoption = ""
let ifirefoxoption = ''
let maxInstances
let capabilities = [];
let path_app_release_android
DynamicEnvUtil.initConfig();
DynamicEnvUtil.checkBrowserMode();
DynamicEnvUtil.checkRunnerMode();
DynamicEnvUtil.checkHeadlessMode();
DynamicEnvUtil.checkEnvMode()

const prefs = {
    'download.default_directory': path.join(process.cwd(), 'src', 'data', 'download')
};

if (process.env.BROWSER == 'chrome') {
    if (process.env.HEADLESS == 'true') {
        ichromeoption = {
            'args': ['--headless=true', '--window-size=1920,2160', '--disable-extensions', '--disable-features=VizDisplayCompositor', 'disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--enable-features=NetworkService'],
            'prefs': prefs
    } ;
    } else {
        ichromeoption = {
            'prefs': prefs
        }
    }
    ibrowser = 'chrome';
} else if (process.env.BROWSER == 'chromium') {
    if (process.env.HEADLESS == 'true') {
        ichromeoption = {'args': ['headless', '--window-size=1920,2160', '--disable-extensions', '--disable-features=VizDisplayCompositor', 'disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--enable-features=NetworkService']} ;
    }
    ibrowser = 'chromium';
} else {
    if (process.env.HEADLESS == 'true') {
        ifirefoxoption = { args: ['--headless', "--window-size=1920,2160", '--disable-extensions', "--disable-features=VizDisplayCompositor", 'disable-gpu', '--no-sandbox', "--disable-dev-shm-usage", '--enable-features=NetworkService']} ;
    }
    ibrowser = 'firefox';
}

// Path app release Android
if (process.env.ENV == 'stag') {
    path_app_release_android = path.resolve(__dirname, 'src/dataMobile/stag/apk/app-release.apk') 
} else if (process.env.ENV == 'dev' || process.env.ENV == 'dev_branch') {
    path_app_release_android = path.resolve(__dirname, 'src/Mobile/dev/apk/app-release.apk')   
} else if (process.env.ENV == 'prod') {
    path_app_release_android = path.resolve(__dirname, 'src/Mobile/prod/apk/app-release.apk')
}

// Capabilities Web | Web and Mobile
if (CONFIG.user_app == 'mobile_app') {
    maxInstances = 1
    capabilities = {
        Web_App: {
            capabilities: {
                browserName: ibrowser,
                'goog:chromeOptions': ichromeoption,   
                'moz:firefoxOptions': ifirefoxoption
            }
        },
        Mobile_App: {
            services: ["appium"],
            path: '/wd/hub',
            port: 4723,
            capabilities: {
                platformName: CONFIG.platformName,
                'appium:platformVersion': CONFIG.platformVersion,
                'appium:deviceName': CONFIG.deviceName,
                'appium:app': path_app_release_android,
                'appium:automationName': 'UiAutomator2',
                'appium:autoGrantPermissions': true
            }
        }
    }
} else {
    maxInstances = CONFIG.maxInstances
    capabilities = {
        Web_App: {
            capabilities: {
                browserName: ibrowser,
                'goog:chromeOptions': ichromeoption,   
                'moz:firefoxOptions': ifirefoxoption,
            }
        }
    }
    
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
 
    specs: [
       CONFIG.features
    ],
    suites: CONFIG.suites,

    // Patterns to exclude.
    exclude: [
        CONFIG.exclude
    ],

    // =====================================
    // Service Configurations & Capabilities
    // =====================================
    
    // configs: [DynamicEnvUtil.initConfig()],
    
    // services: [DynamicEnvUtil.initServices()],

    // capabilities: [DynamicEnvUtil.initDriver()],

    capabilities: [capabilities],

    maxInstances: maxInstances,

    
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
        // ["spec", {
        //     onlyFailures: true,
        // },],
        ['cucumberjs-json', {
            jsonFolder: '.tmp/json/',
            language: 'en',
        },],
        ['allure', {
            outputDir: consts.ALLURE_RESULTS_ROOT,
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: true,
            // disableMochaHooks: true,
            // addConsoleLogs: true
            reportedEnvironmentVars: {
                'BROWSER': process.env.BROWSER,
                'ENV': process.env.ENV,
                'TENANT': process.env.TENANT,
            }
        }],
        ['junit', {
            outputDir: './',
            outputFileFormat: function (options) { // optional
                return `reports/xml/${global.file_run_name}.xml`
            }
        }]
    ],
    // reporters: ['spec'],

    // =====================
    // Hooks
    // =====================

    onPrepare: function (config, capabilities) {
        if (CONFIG.clearAllureResultFolder) {
            FileUtil.deleteFolder(consts.ALLURE_RESULTS_ROOT)
        }   
        // FileUtil.deleteFolder(consts.LOGS_ROOT)
        // FileUtil.deleteFolder(consts.ALLURE_REPORT_ROOT)
        // removeSync('.tmp/')
        // removeSync('./reports/screenshot/*.png')
        console.log('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■')
        console.log('                       START TESTING')
        console.log('. TEST INFORMATION:')
        console.log('. Test Runner   :', process.env.RUNNER)
        console.log('. Test Env      :', process.env.ENV +'      | Tenant: '+ process.env.TENANT)
        console.log('. Test Browser  :', process.env.BROWSER + '    | Headless: ' + process.env.HEADLESS)
        if (process.env.KEGMIL_URL) {
            console.log('. URL           :', process.env.KEGMIL_URL)
        }
        console.log('. Instances     :', CONFIG.maxInstances + '         | RetryFails: ' + CONFIG.retryFails)
        console.log('\n')
    },

    beforeSession: function (config, capabilities, specs) {
        var path_names
        if (specs[0].includes("\\")) {
            path_names = specs[0].split("\\")
        } else {
            path_names = specs[0].split("/")
        }
        let file_run_name = path_names[path_names.length - 1]
        global.file_run_name = file_run_name
        // console.log('. Spec running:', file_run_name)
    },

    before: async function (test, context, options, capabilities) {
        // console.log('. SessionID:', options.sessionId)
        // console.log('. browserVersion: ' + options.capabilities.browserName + '-' + options.capabilities.browserVersion)

        if (process.env.RUNNER == 'ci' || process.env.HEADLESS == true) {
            browser.setWindowSize(1920, 1520)
        }

        // reset app
        if (CONFIG.user_app === 'mobile_app') {
            // const packageName = 'com.kegmil.field';
            // const mainActivity = 'com.kegmil.field.MainActivity';
            // try {
            //     const driverInstance = await driver.getInstance('Mobile_App'); 
            //     const isInstalled = await driverInstance.isAppInstalled(packageName);               
            //     if (isInstalled ) {
            //         await driverInstance.removeApp(packageName);
            //     }
            //     await driverInstance.installApp(path_app_release_android);

            //     if (CONFIG.platform === 'Android') {
            //         await driverInstance.startActivity(packageName, mainActivity);
            //     } else {
            //         await driverInstance.activateApp(packageName);
            //     }
            // } catch (error) {
            // }
        } else {
            browser.maximizeWindow()
        }
    },
    afterHook: function (test, context) {
        // allure_report.addEnvironment("BROWSER", process.env.BROWSER);
        // allure_report.addEnvironment("ENV", process.env.ENV);
        // allure_report.addTestId("" + file_run_name);
    },

    after: function () {
        // browser.deleteSession()
        // console.log('. Delete Session')
    },

    afterSession: function (options, capabilities) {
        // console.log('. After Session')
    },

    /**
     * Cucumber Hooks
     */
    beforeFeature: function (uri, feature) {
        // console.log('\tFeature:', feature.name)
    },

    beforeScenario: function (world) {
        // console.log('\t   Scenario:', world.pickle.name + ' is running .......')
    },

    beforeStep: function (step, scenario) {
        // console.log('\t\t->', step.text)
    },

    afterStep: async function (step, scenario, result) {
        if (!(result.passed)) {
            console.log('\t\t-> Fail on step:', step.text)
            // console.log('. Take a screenshot for fails step ...')
            await browser.saveScreenshot('./reports/screenshot/' + file_run_name + '.png')
        }
    },
    
    afterScenario: async function (world, result) {
        // Delete job on Mobile and remove app
        if (CONFIG.user_app == 'mobile_app') {
            // await ApiJobFlows.deleteJobNameApi()
            await driver.getInstance('Mobile_App').removeApp('com.kegmil.field')
        }
    },

    afterFeature: function (uri, feature) {
    },


    onComplete: function (config) {
        console.log('\n')
        console.log('                       END TESTING')
        console.log('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■')

        if (CONFIG.xray_report.toString() != 'false') {
            console.log('. Generate Xray Report ............')
            XrayUtil.importResultApi()
        }

        if (CONFIG.allure_report) {
            console.log('. Allure Autogenerate Report ............')
            const reportError = new Error('Could not generate Allure report')
            const generation = allure(['generate', consts.ALLURE_RESULTS_ROOT, '--clean'])
            return new Promise((resolve, reject) => {
                const generationTimeout = setTimeout(
                    () => reject(reportError),
                    120000)
                generation.on('exit', function (exitCode) {
                    clearTimeout(generationTimeout)

                    if (exitCode !== 0) {
                        return reject(reportError)
                    }
                    resolve()
                })
            })
        }
    },

    // autoCompileOpts: {
    //     // To disable auto-loading entirely set this to false.
    //     autoCompile: true,
    //     tsNodeOpts: {
    //         transpileOnly: true,
    //         project: 'tsconfig.json'
    //     },

    //     requireModule: ['@babel/register'],
    //     "compilerOptions": {
    //         "types": [
    //             "node",
    //             "webdriverio/sync",
    //         ]
    //     },
    //     //
    //     // If @babel/register is installed, you can customize how options are passed to it here:
    //     // Any valid @babel/register config option is allowed.
    //     // https://babeljs.io/docs/en/babel-register#specifying-options
    //     babelOpts: {
    //         ignore: []
    //     },
    // },
    
}
