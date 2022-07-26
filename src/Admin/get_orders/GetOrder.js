const connector = require('../../_connection/mysqlconnector')
const sqldetails = require('../../_data/Configurations/sql')
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    const query = `SELECT * FROM ${sqldetails.table.orders.ref}`
    connector.query(query, (e, r, f) => {
        //console.log(e);
        res.send(r);

    })

})

router.get('/filter', (req, res) => {

    const sConstant = req.query.s;

    const query = `SELECT * FROM ${sqldetails.table.orders.ref} WHERE ${sqldetails.table.orders.state} = '${sConstant}'`
    connector.query(query, (e, r, f) => {
        //console.log(e);
        res.send(r);
    })

})

router.get('/orderBy', (req, res) => {

    // 0:ASC, 1: DESC
    // (Newer Last) ASC = (Newer will get down)
    // (Newer First) DESC = (Newer will get up)

    const state = req.query.state;
    const sort = req.query.sort;
    if (sort == 1) {
        const query = `SELECT * FROM ${sqldetails.table.orders.ref} WHERE ${sqldetails.table.orders.state} = '${state}' ORDER BY ${sqldetails.table.orders.orderId} DESC`
        connector.query(query, (e, r, f) => {
            res.send(r);
        })
    }
    else {
        const query = `SELECT * FROM ${sqldetails.table.orders.ref} WHERE ${sqldetails.table.orders.state} = '${state}'`
        connector.query(query, (e, r, f) => {
            //console.log(e);
            res.send(r);
        })
    }



})


module.exports = router;