const connector = require('../../_connection/mysqlconnector')
const sqldetails = require('../../_data/Configurations/sql')
const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser')


// router.get('/',(req,res)=>{
//     res.send("USE POST")
// })

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({
    extended:true,
}))

router.post('/',(req,res)=>{

    console.log(req.body);
    
    const new_id = req.body["review"]["id"];
    const new_table =req.body["review"]["tableNo"]
    const new_Sid = req.body["review"]["session_id"];
    const new_rating = req.body["review"]["rating"];
    const new_desc = req.body["review"]["desc"];

    const query = `INSERT INTO ${sqldetails.table.feedback.ref} (${sqldetails.table.feedback.feedbackId}, ${sqldetails.table.feedback.TableNo}, ${sqldetails.table.feedback.sessionId}, ${sqldetails.table.feedback.rating}, ${sqldetails.table.feedback.desc}) VALUES ('${new_id}', '${new_table}', '${new_Sid}', '${new_rating}', '${new_desc}')`;

    connector.query(query,(e,r,f)=>{
        res.send(r);
    })

})



module.exports = router;