const connector = require('../../_connection/mysqlconnector')
const sqldetails = require('../../_data/Configurations/sql')
const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser')


router.get('/', (req, res) => {

    const query = `SELECT * FROM ${sqldetails.table.users.ref}`
    connector.query(query, (e, r, f) => {
        //console.log(e);
        res.send(r);
    })

})
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({
    extended: true,

}))

router.delete('/', (req, res) => {
    //console.log(req.body);
    var id = req.body["id"];
    const query = `DELETE FROM ${sqldetails.table.users.ref} WHERE ${sqldetails.table.users.userId} = ${id}`;

    connector.query(query, (e, r, f) => {
        res.send(r);
    })
})
router.post('/update', (req, res) => {
    const new_id = req.body["user"]["id"]
    const new_name = req.body["user"]["name"];
    const new_pass = req.body["user"]["pass"];
    const new_type = req.body["user"]["type"];

    const query = `UPDATE ${sqldetails.table.users.ref} SET ${sqldetails.table.users.username} = '${new_name}', ${sqldetails.table.users.userPass} = '${new_pass}', ${sqldetails.table.users.type} = '${new_type}' WHERE ${sqldetails.table.users.userId}=${new_id}`
    connector.query(query, (e, r, f) => {
        res.send(r);
    })
})

router.post('/', (req, res) => {
    username = req.body.userObj["name"]
    userpass = req.body.userObj["pass"]

    const query = `SELECT * FROM ${sqldetails.table.users.ref} WHERE ${sqldetails.table.users.username} = '${username}' AND ${sqldetails.table.users.userPass} = '${userpass}'`;
    connector.query(query, (e, r, f) => {
        if (r.length >= 1) {
            res.send(r);  
        }
        else{
            res.send([])
        }
    })
})



module.exports = router;