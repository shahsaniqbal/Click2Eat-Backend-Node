const connector = require('../../_connection/mysqlconnector')
const sqldetails = require('../../_data/Configurations/sql')
const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser')

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({
    extended:true,
}))

router.get('/terms',(req,res)=>{

    const query = `SELECT ${sqldetails.table.terms.desc} FROM ${sqldetails.table.terms.ref} WHERE ${sqldetails.table.terms.Id}='1'`
    connector.query(query,(e,r,f)=>{
        res.send(r);
    })

})

router.get('/aboutUs',(req,res)=>{

    const query = `SELECT ${sqldetails.table.terms.desc} FROM ${sqldetails.table.terms.ref} WHERE ${sqldetails.table.terms.Id}='2'`
    connector.query(query,(e,r,f)=>{
        res.send(r);
    })

})


router.post('/',(req,res)=>{

    const new_Id = req.body["terms"]["Id"];
    const new_desc = req.body["terms"]["desc"];
    console.log(req.body);
    const query = `UPDATE  ${sqldetails.table.terms.ref} SET  ${sqldetails.table.terms.desc}='${new_desc}'  WHERE ${sqldetails.table.terms.Id}='${new_Id}'`;
    
    connector.query(query,(e,r,f)=>{
        res.send(r);
       
    })

})
// router.post('/',(req,res)=>{

//     const new_Id = req.body["terms"]["Id"];
//     const new_desc = req.body["terms"]["desc"];
//     console.log(req.body);
//     const query = `INSERT INTO  ${sqldetails.table.terms.ref} (${sqldetails.table.terms.Id}, ${sqldetails.table.terms.desc}) VALUES ('${new_Id}', '${new_desc}')` ;
    
//     connector.query(query,(e,r,f)=>{
//         res.send(r);
       
//     })

// })



module.exports = router;