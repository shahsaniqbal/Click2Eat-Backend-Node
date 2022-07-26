const connector = require('../../_connection/mysqlconnector')
const sqldetails = require('../../_data/Configurations/sql')
const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const { json } = require('body-parser');

router.get('/',(req,res)=>{
    res.send("USE POST")
})

router.get('/getstateconstant',(req,res)=>{
    const newID = req.query["id"];
    const query = `SELECT ${sqldetails.table.orders.state} AS state FROM ${sqldetails.table.orders.ref} WHERE ${sqldetails.table.orders.orderId}='${newID}'`
    connector.query(query, (e, r, f) => {
        res.send(r);
    })
})


router.use(bodyparser.json());
router.use(bodyparser.urlencoded({
    extended:true,
}))

router.post('/',(req,res, next)=>{
    const jsonReq = JSON.stringify(req.body)
    const query = `INSERT INTO ${sqldetails.table.orders.ref} (${sqldetails.table.orders.details}, ${sqldetails.table.orders.state}, ${sqldetails.table.orders.uName}, ${sqldetails.table.orders.netTotal}) VALUES ('${jsonReq}', '0', '${req.body.uid}', '${req.body.netTotal}')`;
    connector.query(query,(e,r,f)=>{        
        next()
    })

})

router.post('/',(req,res)=>{
    const query = `SELECT MAX(${sqldetails.table.orders.orderId}) AS id FROM ${sqldetails.table.orders.ref};`
    connector.query(query, (e, r, f) => {
        console.log(r);
        res.send(r);
    })
})

module.exports = router;