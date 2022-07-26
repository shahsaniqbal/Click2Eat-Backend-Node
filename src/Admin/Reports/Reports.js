const connector = require('../../_connection/mysqlconnector')
const sqldetails = require('../../_data/Configurations/sql')
const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser')

router.get('/bydate',(req,res, next)=>{

    const query = `SELECT ${sqldetails.table.orders.date} AS Date, SUM(${sqldetails.table.orders.netTotal}) AS TotalSale FROM ${sqldetails.table.orders.ref} GROUP BY ${sqldetails.table.orders.date} ORDER BY ${sqldetails.table.orders.date} DESC`
    connector.query(query,(e,r,f)=>{
        //console.log(e);
        req["report_details"] = r;
        next();
    })

})

router.get('/bydate',(req,res)=>{

    const r = req["report_details"]

    var overallSale = 0;
    for (let index = 0; index < r.length; index++) {
        
        const date = JSON.stringify(r[index].Date).split("T")[0] +"\""
        
        r[index]["Date"] = JSON.parse(date);
        overallSale += r[index]["TotalSale"]        
    }
    res.send({
        "details":r,
        "overallSale": overallSale 
    })
})

router.get('/misc',(req,res, next)=>{

    const query = `SELECT ${sqldetails.table.orders.uName} AS User, COUNT(${sqldetails.table.orders.orderId}) AS TotalOrders FROM ${sqldetails.table.orders.ref} GROUP BY ${sqldetails.table.orders.uName} ORDER BY ${sqldetails.table.orders.uName} ASC`
    connector.query(query,(e,r,f)=>{
        //console.log(e);
        res.send(r)
    })

})


module.exports = router;