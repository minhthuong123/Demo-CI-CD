const data_stag = require('./stag/DataObj.js')
const data_prod = require('./prod/DataObj.js')
const data_tenants_admin_stag = require('./stag/DataTenantsAdmin.js')
const data_tenants_admin_prod = require('./prod/DataTenantsAdmin.js')

if (process.env.ENV == 'stag') {
    module.exports.DataInput = data_stag
    module.exports.DataTenantsAdminInput = data_tenants_admin_stag


} else if (process.env.ENV == 'prod') {
    module.exports.DataInput = data_prod
    module.exports.DataTenantsAdminInput = data_tenants_admin_prod
}
src/data/web/b2b_data/DataInput.js