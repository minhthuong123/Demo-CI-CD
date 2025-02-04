const CONFIG = {

    // CONFIG STATIC RUNNER
    // Default: local run ci with prefix env=ci
    env: 'stag', // dev | stag | prod
    tenant: 'autos', // (stag|autos , prod|autoy)
    browser: 'chrome', // chrome | firefox | safari 
    headless: false, // safari not support headless
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
        './src/specs/**',
        './src/specs_new/**',
    ],
    suites: {
        sample: ['./src/specs/_sample_feature/**'],
        e2e: [
            './src/specs/Smoke/**'
        ],
        regression: [
            './src/specs_new/WebApp/Administration/**',
            './src/specs_new/WebApp/Clients/**',
            './src/specs_new/WebApp/GlobalSearch/**',
            './src/specs_new/WebApp/Configuration/**',
            './src/specs_new/WebApp/Jobs/**',
            './src/specs_new/WebApp/MyProfile/**',
        ],
        smoke: ['./src/specs/_sample_feature/QA-0001.Login.feature'],

        // Special Suite
        adhoc: ['./src/specs/Adhoc/**'],
        admin: ['./src/specs_new/WebApp/Administration/**'],
        client: ['./src/specs_new/WebApp/Clients/**'],
        globalSearch: ['./src/specs_new/WebApp/GlobalSearch/**'],
        config: ['./src/specs_new/WebApp/Configuration/**'],
        job: ['./src/specs_new/WebApp/Jobs/**'],

        // Sub suite
        clientM: ['./src/specs_new/WebApp/Clients/ClientsManagement/**'],
        siteM: ['./src/specs_new/WebApp/Clients/SitesManagement/**'],
        assetM: ['./src/specs_new/WebApp/Clients/AssetsManagement/**'],
        contractM: ['./src/specs_new/WebApp/Clients/ContractsManagement/**'],
        requestM: ['./src/specs_new/WebApp/Clients/RequestsManagement/**'],
        clientUser: ['./src/specs_new/WebApp/Clients/ClientsUser/**'],
        clientPortalR: ['./src/specs_new/WebApp/Clients/ClientsPortalRequests/**'],
        clientPortalU: ['./src/specs_new/WebApp/Clients/ClientsPortalUser/**'],
        
        role: ['./src/specs_new/WebApp/Administration/RolesManagement/**'],
        team: ['./src/specs_new/WebApp/Administration/TeamsManagement/**'],
        userM: ['./src/specs_new/WebApp/Administration/UsersManagement/**'],
        
        checklist: ['./src/specs_new/WebApp/Configuration/Checklists/**'],
        properties: ['./src/specs_new/WebApp/Configuration/PropertiesConfiguration/**'],
        rule: ['./src/specs_new/WebApp/Configuration/RuleSettings/**'],
        workflow: ['./src/specs_new/WebApp/Configuration/Workflows/**'],
        
        jobL: ['./src/specs_new/WebApp/Jobs/JobsManagementListView/**'],
        jobSp: ['./src/specs_new/WebApp/Jobs/JobsManagementSplitView/**'],
        jobSc: ['./src/specs_new/WebApp/Jobs/JobsScheduler/**'],

        myPf: ['./src/specs_new/WebApp/MyProfile/**'],

        // network log api
        networklog: ['./src/specs/NetworkLogAPI/*'],

        
    },
    exclude: [
        './src/specs/_sample_feature/KM-8668.feature'
    ],

    // CREATE TEST EXECUTION REPORT
    xray_report: false,  // true | false | Exist Test Execution: 'QA-725'
    allure_report: true // true | false

}

exports.CONFIG = CONFIG

