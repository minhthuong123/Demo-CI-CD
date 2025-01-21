var path = require('path')
let tenant = process.env.TENANT
// process.env.TENANT = 'qaauto'
let client_portal = '.portal.kegmil.com/'
const stag_url = 'https://' + tenant + '.stag.kegmil.co'
const dev_url = 'https://' + tenant + '.dev.kegmil.co/'
const prod_url = 'https://' + tenant + '.app.kegmil.com'
const qa = 'https://' + tenant + '.qa.kegmil.com'
const client_portal_url = 'https://' + tenant + client_portal
const ENV = process.env.ENV
const KegmilUrl = process.env.KEGMIL_URL
class Urls {
    getEnv() {
        switch (ENV) {
            case 'dev':
                return dev_url
            case 'stag':
                return stag_url
            case 'prod':
                return prod_url
            default:
                return KegmilUrl
        }
    }

    getClientPortal() {
        switch (ENV) {
            case 'stag':
                client_portal = '.clientportal-stag.kegmil.co'
                return 'https://' + tenant + client_portal
            case 'prod':
                client_portal = '.portal.kegmil.com'
                return 'https://' + tenant + client_portal
            default:
                return KegmilUrl
        }
    }

    getTenantsAdminPortal() {
        switch (ENV) {
            case 'stag':
                return 'https://admin-stag.kegmil.co/';
            case 'prod':
                return 'https://admin.kegmil.com/';
            case 'dev':
                return 'https://admin.kegmil.co/';
        }
    }

    BASE_URL = this.getEnv()

    // Kegmil URL
    LOGIN_URL = 'https://arobid-staging.arobid.site/'

    // Dashboard
    JOB_SUMMARY = this.BASE_URL + '/summary/job'
    CLIENT_SUMMARY = this.BASE_URL + '/summary/client'

    // Client
    CLIENT_MANAGEMENT_URL = this.BASE_URL + '/clients'
    CLIENT_ID_URL = this.BASE_URL + '/clients/%s'
    CLIENT_ID_OVERVIEW_TAB = this.BASE_URL + '/clients/%s?content=overview'
    CLIENT_ID_SITE_TAB = this.BASE_URL + '/clients/%s?content=site'
    CLIENT_ID_SITE_ID_URL = this.BASE_URL + '/clients/%s?content=site&id=%s'
    CLIENT_ID_ASSET_TAB = this.BASE_URL + '/clients/%s?content=asset'
    CLIENT_ID_ASSET_ID_URL = this.BASE_URL + '/clients/%s?content=asset&id=%s'
    CLIENT_ID_CONTRACT_TAB = this.BASE_URL + '/clients/%s?content=contract'
    CLIENT_ID_REQUEST_TAB = this.BASE_URL + '/clients/%s?content=request'
    CLIENT_ID_REQUEST_ID = this.BASE_URL + '/clients/%s?content=request&id=%s'
    CLIENT_ID_USER_TAB = this.BASE_URL + '/clients/%s?content=user'

    // Job
    JOBS_URL = this.BASE_URL + '/job/jobs'
    JOBS_ADD_URL = this.BASE_URL + '/job/jobs/add'
    JOB_ID_URL = this.BASE_URL + '/job/jobs/%s'
    JOBS_SCHEDULER_URL = this.BASE_URL + '/job/scheduler'

    // Asset Report
    ASSET_REPORT = this.BASE_URL + '/statistical-reports/asset'

    // Administration
    ADMIN_ROLES = this.BASE_URL + '/administration/roles'
    ROLE_ID_VIEW_MODE_URL = this.BASE_URL + '/administration/roles/%s?mode=view'
    ROLE_ID_EDIT_MODE_URL = this.BASE_URL + '/administration/roles/%s?mode=edit'

    ADMIN_TEAMS = this.BASE_URL + '/administration/teams'

    ADMIN_USER_URL = this.BASE_URL + '/administration/users'
    ADMIN_ROLE_URL = this.BASE_URL + '/administration/roles'

    // Timesheets
    TIMESHEET_PAGE = this.BASE_URL + '/administration/users'

    //Resources
    PASSES = this.BASE_URL + '/resources-management/pass'
    CERTIFICATIONS = this.BASE_URL + '/resources-management/certification'

    // Config - Settings
    RULE_SETTINGS_URL = this.BASE_URL + '/configuration/rule-settings'
    PROPERTIES_CONFIGURATION_URL = this.BASE_URL + '/configuration/field-settings'
    CHECKLISTS = this.BASE_URL + '/configuration/checklists'
    CHECKLIST_ID_URL = this.BASE_URL + '/configuration/checklists/%s'
    WORKFLOWS = this.BASE_URL + '/configuration/workflows'
    BRANDING = this.BASE_URL + '/configuration/branding'
    RESOURCE_SETTINGS = this.BASE_URL + '/configuration/resource-settings'
    RESOURCE_SKILL = this.BASE_URL + '/configuration/resource-settings?tab=skills'
    EVENT = this.BASE_URL + '/configuration/events'

    // Client portal
    BASE_PORTAL_URL = this.getClientPortal()
    CLIENT_PORTAL_REQUEST = this.BASE_PORTAL_URL + '/requests'
    CLIENT_PORTAL_USER = this.BASE_PORTAL_URL + '/users'

    // Tenants Admin

}
module.exports = new Urls()