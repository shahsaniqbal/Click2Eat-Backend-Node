const connector = require('../../../_connection/mysqlconnector')
const sqldetails = require('../../../_data/Configurations/sql')
const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser')


router.get('/',(req,res)=>{

    const query = `SELECT * FROM ${sqldetails.table.category.ref}`
    connector.query(query,(e,r,f)=>{
        //console.log(e);
        res.send(r);
    })

})


router.use(bodyparser.json());
router.use(bodyparser.urlencoded({
    extended:true,
}))


router.delete('/',(req,res)=>{
    //console.log(req.body);
    var id = req.body["id"];
    const query = `DELETE FROM ${sqldetails.table.category.ref} WHERE ${sqldetails.table.category.id} = ${id}`;

    connector.query(query,(e,r,f)=>{
        res.send(r);
    })
})

router.post('/update',(req,res)=>{
    const new_id = req.body["category"]["id"];
    const new_name = req.body["category"]["name"];
    const new_desc = req.body["category"]["desc"];

    const query =  `UPDATE ${sqldetails.table.category.ref} SET ${sqldetails.table.category.name} = '${new_name}', ${sqldetails.table.category.description} = '${new_desc}' WHERE ${sqldetails.table.category.id}=${new_id}`
    connector.query(query,(e,r,f)=>{
        res.send(r);
    })
})

router.post('/',(req,res)=>{
    // Work here to Add Categories
    
    const new_id = req.body["category"]["id"];
    const new_name = req.body["category"]["name"];
    const new_desc = req.body["category"]["desc"];

    const query = `INSERT INTO ${sqldetails.table.category.ref} (${sqldetails.table.category.id}, ${sqldetails.table.category.name}, ${sqldetails.table.category.description}) VALUES ('${new_id}', '${new_name}', '${new_desc}')`;

    connector.query(query,(e,r,f)=>{
        res.send(r);
    })

})

module.exports = router;