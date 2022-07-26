const connector = require('../../_connection/mysqlconnector')
const sqldetails = require('../../_data/Configurations/sql')
const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser')



router.use(bodyparser.json());
router.use(bodyparser.urlencoded({
    extended:true,
}))


router.post('/',(req,res)=>{
    const new_id = req.body["orderState"]["id"];
    const new_state = req.body["orderState"]["state_const"];

    console.log(req.body.orderState.id);
    const query =  `UPDATE ${sqldetails.table.orders.ref} SET ${sqldetails.table.orders.state} = '${new_state}'  WHERE ${sqldetails.table.orders.orderId}=${new_id}`
    connector.query(query,(e,r,f)=>{
        res.send(r);
    })
})

module.exports = router;