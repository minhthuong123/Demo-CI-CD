# CLONE AND SETUP PROJECT

## HOW TO RUN THE TEST SCRIPT ON LOCAL OS:

Recommend has install on local machine `JDK 1.8+` (require to start Selenium Server), `Node.JS` (Install Node.js <=v16)
, `python>3` to use sync mode

- Install Node v18
- Install Java 8
- Install python 3
- SET JAVA_HOME path

Open command line window, navigate to the project folder

Install lib

- `$ npm install`

Start test

- With default config on `config.properties`
   `$ npm test`
- With dynamic env variant
   `$ npm run f QA-0001.feature` | `$ env=chrome_stag npm run f QA-0001.feature`

# CONFIG AND RUN PROJECT

## HOW TO RUN TEST SCRIPT WITH STATIC/ DYNAMIC MODE

RUN TEST WITH STATIC MODE

- Config on file `config/config.properties.js` (Runner: default local, browser type, feature run ....)
- Run test: `$ npm test` or specific testcase `$ npm run f QA-0001.feature` `$ npm run f QA-0001.*`

RUN TEST WITH DYNAMIC MODE: dynamic runner (ci|local), browser(chrome|firefox|safari), env (stag|dev|prod), headless (true|false)

- `$ env=ci_dev_chrome npm run f QA-0001.feature`
- `$ env=stag_firefox npm run f QA-0001.feature` or `$ env=local_stag_firefox npm run f QA-0001.feature`
- Run Headless mode `$ env=stag_firefox_true npm run f QA-0001.feature`

## HOW TO RUN DYNAMIC TEST SCRIPT WITH CLI

Config test script on static file and run with:

- `$ npm test` or `$ npm run all`

Run with feature file ID

- `$ npm run f QA-0001.feature` or `$ npm run f QA-0001.feature QA-0002 QA-0003.feature`

Run with suite

- `$ npm run s login` or `$ npm run s login jobs e2e`

Run with cucumber tags

- `$ npm run t @login` or `$ npm run t '@login or @client'` or `$ npm run t '@login and @client'`

## HOW TO RUN TEST WITH DYNAMIC DEV BRANCH

- Export dev branch url: `$ export KEGMIL_URL=http://dev-do-228.kegmil.co`
- Run test `$ npm test`

## HOW TO CONFIG FOR GENERATE XRAY REPORT

GENERATE NEW XRAY TEST EXECUTION REPORT AFTER RUN

- Open `config/config.properties.js` set `xray_report: true`

NOT GENERATE XRAY TEST EXECUTION REPORT AFTER RUN

- Open `config/config.properties.js` set `xray_report: false`

IMPORT NEW RESULT TO EXIST TEST EXECUTION

- ex: test execution QA-725
- Open `config/config.properties.js` set `xray_report: QA-725`

## Capture network log API

RUN ON FIXED AUTO TENANT: Autoz/ autos

- `$ env=prod_chrome npm run s networklog`
   RUN WITH OTHER TENANT
- Open `config/config.properties.js` set tenant running
- `$ npm run s networklog`

#----------------------------------------------------------------------------------------

# WRITE TEST/ CONFIG/ CONVENTION

## HOW TO WRITE TEST CASE

WRITE FEATURE FILE: Export file from jira or write with correct feature file format (sample: QA-671)

- Using `Given` `And` for prefixed testcase
- Using `Then` and Asert util for check point
- Using syntax: `In <Page/Section>, action` when write steps for specific page

## Project Naming Conventions

- Use snake_case for variables, properties, data object
- Use camelCase for function names
- Use PascalCase for class names
- Use UPPERCASE for Constants

# VIEW LOCAL REPORT

- After run script show local report by comman: `allure open`
- Genarate report from Allure result: `allure generate ./reports/allure-results --clean`

# ALLURE DEPLOY NETLIFY

- Install netlify: `sudo npm install -g netlify-cli@16.9.3 --force`
- Export Token: `export NETLIFY_AUTH_TOKEN= nfp_2F3kC5EwWAdDfYUywLxbA6DCrfzgL7jb45f3`
- After run script show local report by comman: `npm run allure-deploy`

#----------------------------------------------------------------------------------------

# COMIT CODE RULE

## HOW TO PUSH CODE TO GITLAB

- Create PR to origin branch: dev (default branch)
- Merge dev to branch master/auto/tamvv weekly to run CICD

## IGNORE FILE

- Ignore and not push code to `node_modules`, `package.json`, `package-lock.json`
- `git update-index --assume-unchanged package-lock.json`
- `git update-index --assume-unchanged node_modules/selenium-standalone/.selenium/geckodriver/0.29.1-x64/geckodriver.gz`
- `git update-index --assume-unchanged node_modules/selenium-standalone/.selenium/geckodriver/0.29.1-x64/geckodriver`
- `git update-index --assume-unchanged node_modules/selenium-standalone/.selenium/chromedriver/latest-x64/chromedriver`
- `git update-index --assume-unchanged node_modules/selenium-standalone/.selenium/chromedriver/latest-x64/chromedriver.zip`

#----------------------------------------------------------------------------------------

# OTHERS

### TROUBLESHOOT

**Fix allure cli when run local on mac os**

- Install homebrew: $ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
- Install allure: $ brew install allure

<!-- Install standalone/ update driver
- $ ./node_modules/.bin/selenium-standalone install

**Error about ts-node**
- npm i -D typescript ts-node