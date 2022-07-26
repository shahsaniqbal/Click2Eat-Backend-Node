const connector = require('../../_connection/mysqlconnector')
const sqldetails = require('../../_data/Configurations/sql')
const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser')


router.get('/',(req,res)=>{
    res.send("USE POST")
})

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({
    extended:true,
}))

router.post('/',(req,res)=>{
    // Work here to Add Categories

    console.log(req.body);
    
    const new_id = req.body["user"]["id"];
    const new_name = req.body["user"]["name"];
    const new_desc = req.body["user"]["pass"];
    const new_type = req.body["user"]["type"];

    const query = `INSERT INTO ${sqldetails.table.users.ref} (${sqldetails.table.users.userId}, ${sqldetails.table.users.username}, ${sqldetails.table.users.userPass}, ${sqldetails.table.users.type}) VALUES ('${new_id}', '${new_name}', '${new_desc}', '${new_type}')`;

    connector.query(query,(e,r,f)=>{
        res.send(r);
    })

})



module.exports = router;