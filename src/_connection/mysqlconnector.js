const mysql = require('mysql')
const sqlconfig = require('../_data/Configurations/sql')

const conn = mysql.createConnection(sqlconfig.configs)

module.exports = conn;