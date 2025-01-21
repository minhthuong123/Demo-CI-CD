const { CONFIG } = require("../../../config/config.properties")

const env = process.env.env
let run_dynamic = false
const KegmilUrl = process.env.KEGMIL_URL

process.env.RUNNER = ''
process.env.ENV = ''
process.env.BROWSER = ''
process.env.HEADLESS = ''
process.env.TENANT = ''
const dynamicConfig = {}
const default_runner = 'local'
process.env.PORT = 6969
class DynamicEnvUtil {

    async isRunDynamic() {
        if (process.env.env) {
            return run_dynamic = true
        } else {
            return run_dynamic = false
        }
    }

    async initConfig() {
        await this.isRunDynamic()
        // process.env.RUNNER
        await this.checkRunnerMode()
        // process.env.BROWSER
        await this.checkBrowserMode()
        // process.env.HEADLESS
        await this.checkHeadlessMode()
        // process.env.ENV = CONFIG.env process.env.TENANT
        await this.initEnvRunning()

    }

    async checkRunnerMode() {
        if (run_dynamic) {
            if (process.env.env.split('_').includes('ci')) {
                process.env.RUNNER = 'ci'
                // process.env.HEADLESS = true
            } else if (process.env.env.split('_').includes('local')) {
                process.env.RUNNER = 'local'
                // process.env.HEADLESS = CONFIG.headless
            } else {
                process.env.RUNNER = default_runner
            }
        } else {
            // Case set env but not input runner
            return process.env.RUNNER = default_runner
            // process.env.HEADLESS = CONFIG.headless
        }
    }

    async checkBrowserMode() {
        if (run_dynamic) {
            if (process.env.env.split('_').includes('chrome')) {
                return process.env.BROWSER = 'chrome'
            } else if (process.env.env.split('_').includes('firefox')) {
                return process.env.BROWSER = 'firefox'
            } else if (process.env.env.split('_').includes('chromium')) {
                return process.env.BROWSER = 'chromium'
            } else if (process.env.env.split('_').includes('safari')) {
                process.env.HEADLESS = false
                process.env.RUNNER = 'local'
                return process.env.BROWSER = 'safari'
            } else {
                return process.env.BROWSER = CONFIG.browser
            }
        } else {
            return process.env.BROWSER = CONFIG.browser
        }
    }

    async checkHeadlessMode() {
        if (run_dynamic) {
            if (process.env.RUNNER == 'ci') {
                process.env.HEADLESS = true
            } else {
                if (process.env.env.split('_').includes('true')) {
                    process.env.HEADLESS = true
                } else if (process.env.env.split('_').includes('false')) {
                    process.env.HEADLESS = false
                } else {
                    // default headless false
                    process.env.HEADLESS = false
                }
            }
        } else {
            process.env.HEADLESS = CONFIG.headless
        }
    }

    async initEnvRunning() {
        if (!KegmilUrl) {
            await this.checkEnvMode()
        } else {
            // Run has Export URL
            if (KegmilUrl.includes('stag.kegmil.co')) {
                process.env.ENV = 'stag'
                process.env.TENANT = 'autos'
            } else if (KegmilUrl.includes('app.kegmil.com')) {
                process.env.ENV = 'prod'
                process.env.TENANT = 'autoy'
            } else if (KegmilUrl.includes('dev.kegmil.co')){
                process.env.ENV = 'dev'
                process.env.TENANT = 'manual'
            } else {
                process.env.ENV = 'dev_branch'
                process.env.TENANT = 'manual'
            }
        }
    }


    async checkEnvMode() {
        if (run_dynamic) {
            if (process.env.env.split('_').includes('stag')) {
                process.env.ENV = 'stag'
                process.env.TENANT = 'autos'
            } else if (process.env.env.split('_').includes('dev')) {
                process.env.ENV = 'dev'
                process.env.TENANT = 'manual'
            } else if (process.env.env.split('_').includes('prod')) {
                process.env.ENV = 'prod'
                process.env.TENANT = 'autoy'
            } else {
                process.env.ENV = CONFIG.env
                process.env.TENANT = CONFIG.tenant
            }
        } else {
            process.env.ENV = CONFIG.env
            process.env.TENANT = CONFIG.tenant
        }
    }

    

    // async initBrowser() {
    //     if (process.env.RUNNER == 'ci') {
    //         process.env.PORT = 4446
    //     } else {
    //         process.env.PORT = 4447
    //     }

    //     if (process.env.RUNNER == 'ci') {
    //         if (process.env.BROWSER == 'chrome') {
    //             dynamicConfig.capabilities = {
    //                 maxInstances: Number(CONFIG.maxInstances),
    //                 browserName: 'chrome',
    //                 port: Number(process.env.PORT),
    //                 acceptInsecureCerts: true,
    //                 'goog:chromeOptions': {
    //                     args: ['--headless', '--window-size=1920,2160', '--disable-extensions', "--disable-features=VizDisplayCompositor", 'disable-gpu', '--no-sandbox', '--disable-dev-shm-usage']
    //                 }
    //             }
    //             return dynamicConfig.capabilities
    //         } else if (process.env.BROWSER == 'firefox') {
    //             dynamicConfig.capabilities = {
    //                 maxInstances: Number(CONFIG.maxInstances),
    //                 browserName: 'firefox',
    //                 port: Number(process.env.PORT),
    //                 acceptInsecureCerts: true,
    //                 'moz:firefoxOptions': {
    //                     args: ['--headless', "--window-size=1920,2160", "--disable-features=VizDisplayCompositor", "--disable-dev-shm-usage"]
    //                 }
    //             }
    //             return dynamicConfig.capabilities
    //         }
    //     } else {
    //         if (process.env.HEADLESS == 'true') {
    //             if (process.env.BROWSER == 'chrome') {
    //                 dynamicConfig.capabilities = {
    //                     maxInstances: Number(CONFIG.maxInstances),
    //                     browserName: 'chrome',
    //                     port: Number(process.env.PORT),
    //                     acceptInsecureCerts: true,
    //                     'goog:chromeOptions': {
    //                         args: ['--headless', '--window-size=1920,2160', '--disable-extensions', "--disable-features=VizDisplayCompositor", 'disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--enable-features=NetworkService']
    //                     }
    //                 }
    //                 return dynamicConfig.capabilities

    //             } else if (process.env.BROWSER == 'firefox') {
    //                 dynamicConfig.capabilities = {
    //                     maxInstances: Number(CONFIG.maxInstances),
    //                     browserName: 'firefox',
    //                     port: Number(process.env.PORT),
    //                     acceptInsecureCerts: true,
    //                     'moz:firefoxOptions': {
    //                         args: ['--headless', "--window-size=1920,2160", '--disable-extensions', "--disable-features=VizDisplayCompositor", 'disable-gpu', '--no-sandbox', "--disable-dev-shm-usage", '--enable-features=NetworkService']
    //                     }
    //                 }
    //                 return dynamicConfig.capabilities
    //             }
    //         } else {
    //             dynamicConfig.capabilities = { 
    //                 maxInstances: Number(CONFIG.maxInstances), 
    //                 browserName: process.env.BROWSER, 
    //                 port: Number(process.env.PORT), 
    //                 acceptInsecureCerts: true ,
    //             }
    //             return dynamicConfig.capabilities
    //         }
    //     }
    // }

    // async initServices() {
    //     let seleniumServices
    //     if (process.env.RUNNER == 'ci') {
    //         seleniumServices = ['selenium-standalone', {
    //             args: { version: "3.141.59", seleniumArgs: ['-host', 'localhost', '-port', '4446'] },
    //             drivers: { firefox: '0.29.1', chrome: '91.0.4472.101' },
    //         }]
    //     } else {
    //         seleniumServices = ['selenium-standalone', {
    //             args: { version: "3.141.59", seleniumArgs: ['-host', 'localhost', '-port', '4447'] },
    //             drivers: { firefox: '0.29.1', chrome: true }
    //         }]
    //     }
    //     return seleniumServices
    // }

    // async initDriver() {
        // if (process.env.HEADLESS = true || process.env.RUNNER == 'ci') {
        //     if (process.env.BROWSER == 'chrome') {
        //         dynamicConfig.capabilities = {
        //             browserName: 'chrome',
        //             'goog:chromeOptions': {
        //                 args: ['--headless', '--window-size=1920,2160', '--disable-extensions', "--disable-features=VizDisplayCompositor", 'disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--enable-features=NetworkService']
        //             }
        //         }
        //         return dynamicConfig.capabilities;
        //     } else {
        //         dynamicConfig.capabilities = {
        //             browserName: 'firefox',
        //             'moz:firefoxOptions': {
        //                 args: ['--headless', "--window-size=1920,2160", '--disable-extensions', "--disable-features=VizDisplayCompositor", 'disable-gpu', '--no-sandbox', "--disable-dev-shm-usage", '--enable-features=NetworkService']
        //             }
        //         }
        //         return dynamicConfig.capabilities;
        //     }
        // } else {
        //     if (process.env.BROWSER == 'chrome') {
        //         dynamicConfig.capabilities = {
        //             browserName: 'chrome',
        //         }
        //         console.log('--------------------------------------------CHECK:',dynamicConfig.capabilities)
        //         return dynamicConfig.capabilities;
        //     } else {
        //         cap = {
        //             browserName: 'firefox',
        //         }
        //         return dynamicConfig.capabilities;
        //     }
        // }
    // }

}

module.exports = new DynamicEnvUtil()