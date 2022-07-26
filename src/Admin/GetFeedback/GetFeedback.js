const connector = require('../../_connection/mysqlconnector')
const sqldetails = require('../../_data/Configurations/sql')
const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser')

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({
    extended:true,
}))


router.get('/',(req,res)=>{

    const query = `SELECT * FROM ${sqldetails.table.feedback.ref}`
    connector.query(query,(e,r,f)=>{
        //console.log(e);
        res.send(r);
     
    })

})







module.exports = router;