const { CONFIG } = require('../../../config/config.properties');

const env = process.env.env;
let run_dynamic = false;
const KegmilUrl = process.env.KEGMIL_URL;

process.env.RUNNER = '';
process.env.ENV = '';
process.env.BROWSER = '';
process.env.HEADLESS = '';
process.env.TENANT = '';
const dynamicConfig = {};
const default_runner = 'local';
process.env.PORT = 6969;
class DynamicEnvUtil {
  async isRunDynamic() {
    if (process.env.env) {
      return (run_dynamic = true);
    } else {
      return (run_dynamic = false);
    }
  }

  async initConfig() {
    await this.isRunDynamic();
    // process.env.RUNNER
    await this.checkRunnerMode();
    // process.env.BROWSER
    await this.checkBrowserMode();
    // process.env.HEADLESS
    await this.checkHeadlessMode();
    // process.env.ENV = CONFIG.env process.env.TENANT
    await this.initEnvRunning();
  }

  async checkRunnerMode() {
    if (run_dynamic) {
      if (process.env.env.split('_').includes('ci')) {
        process.env.RUNNER = 'ci';
        // process.env.HEADLESS = true
      } else if (process.env.env.split('_').includes('local')) {
        process.env.RUNNER = 'local';
        // process.env.HEADLESS = CONFIG.headless
      } else {
        process.env.RUNNER = default_runner;
      }
    } else {
      // Case set env but not input runner
      return (process.env.RUNNER = default_runner);
      // process.env.HEADLESS = CONFIG.headless
    }
  }

  async checkBrowserMode() {
    if (run_dynamic) {
      if (process.env.env.split('_').includes('chrome')) {
        return (process.env.BROWSER = 'chrome');
      } else if (process.env.env.split('_').includes('firefox')) {
        return (process.env.BROWSER = 'firefox');
      } else if (process.env.env.split('_').includes('chromium')) {
        return (process.env.BROWSER = 'chromium');
      } else if (process.env.env.split('_').includes('safari')) {
        process.env.HEADLESS = false;
        process.env.RUNNER = 'local';
        return (process.env.BROWSER = 'safari');
      } else {
        return (process.env.BROWSER = CONFIG.browser);
      }
    } else {
      return (process.env.BROWSER = CONFIG.browser);
    }
  }

  async checkHeadlessMode() {
    if (run_dynamic) {
      if (process.env.RUNNER == 'ci') {
        process.env.HEADLESS = true;
      } else {
        if (process.env.env.split('_').includes('true')) {
          process.env.HEADLESS = true;
        } else if (process.env.env.split('_').includes('false')) {
          process.env.HEADLESS = false;
        } else {
          // default headless false
          process.env.HEADLESS = false;
        }
      }
    } else {
      process.env.HEADLESS = CONFIG.headless;
    }
  }

  async initEnvRunning() {
    if (!KegmilUrl) {
      await this.checkEnvMode();
    } else {
      // Run has Export URL
      if (KegmilUrl.includes('stag.kegmil.co')) {
        process.env.ENV = 'stag';
        process.env.TENANT = 'autos';
      } else if (KegmilUrl.includes('app.kegmil.com')) {
        process.env.ENV = 'prod';
        process.env.TENANT = 'autoy';
      } else if (KegmilUrl.includes('dev.kegmil.co')) {
        process.env.ENV = 'dev';
        process.env.TENANT = 'manual';
      } else {
        process.env.ENV = 'dev_branch';
        process.env.TENANT = 'manual';
      }
    }
  }

  async checkEnvMode() {
    if (run_dynamic) {
      if (process.env.env.split('_').includes('stag')) {
        process.env.ENV = 'stag';
        process.env.TENANT = 'autos';
      } else if (process.env.env.split('_').includes('dev')) {
        process.env.ENV = 'dev';
        process.env.TENANT = 'manual';
      } else if (process.env.env.split('_').includes('prod')) {
        process.env.ENV = 'prod';
        process.env.TENANT = 'autoy';
      } else {
        process.env.ENV = CONFIG.env;
        process.env.TENANT = CONFIG.tenant;
      }
    } else {
      process.env.ENV = CONFIG.env;
      process.env.TENANT = CONFIG.tenant;
    }
  }
}

module.exports = new DynamicEnvUtil();
