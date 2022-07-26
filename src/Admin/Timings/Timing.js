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

    const query = `SELECT * FROM ${sqldetails.table.timings.ref} `
    connector.query(query,(e,r,f)=>{
        res.send(r);
     
    })

})

router.post('/',(req,res)=>{

    //console.log(req.body);
    const new_Id = req.body["timings"]["Id"];
    const new_Mon = req.body["timings"]["Monday"];
    const new_Tues =req.body["timings"]["Tuesday"]
    const new_Wed = req.body["timings"]["Wednesday"];
    const new_Thurs = req.body["timings"]["Thursday"];
    const new_Fri = req.body["timings"]["Friday"];
    const new_Sat = req.body["timings"]["Saturday"];
    const new_Sun =req.body["timings"]["Sunday"]

    const query = `UPDATE  ${sqldetails.table.timings.ref} SET  ${sqldetails.table.timings.Mon}='${new_Mon}', ${sqldetails.table.timings.Tue}='${new_Tues}', ${sqldetails.table.timings.Wed}='${new_Wed}', ${sqldetails.table.timings.Thurs}='${new_Thurs}', ${sqldetails.table.timings.Fri}='${new_Fri}', ${sqldetails.table.timings.Sat}='${new_Sat}', ${sqldetails.table.timings.Sun}='${new_Sun}' WHERE ${sqldetails.table.timings.Id}='${new_Id}'`;

    connector.query(query,(e,r,f)=>{
        res.send(r);
       
    })

})



module.exports = router;