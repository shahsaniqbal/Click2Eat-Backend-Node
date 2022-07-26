const connector = require('../../../_connection/mysqlconnector')
const sqldetails = require('../../../_data/Configurations/sql')
const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser')


router.use(('/', function (req, res, next) {
    connector.query(
        `SELECT * from ${sqldetails.table.category.ref}`,
        function (e, r, f) {
            res.cats = r;
            if (res.cats) next()
            else throw 'Error at Step 1'
        }
    )
}))

router.use(('/', function (req, res, next) {

    //Receiving Data in res.cats
    var mainData = []

    for (let i = 0; i < res.cats.length; i++) {
        const element = res.cats[i];
        mainData.push({
            "CategoryID": element["cat_id"],
            "CategoryName": element["cat_name"],
            "CategoryDesc": element["cat_desc"],
            "itemCount": 0,
            "course": new Array()
        })
    }

    res.mainData = mainData;
    res.cats = null;
    res.cats = undefined;

    if (res.mainData[0].course.length == 0) {
        next()
    }
    else throw 'Error at Step 2'
}))

router.use(('/', async function (req, res, next) {

    //Receiving Data in res.mainData

    const vari = (pointer, next) => {
        if (pointer == res.mainData.length) {
            next()
        }
    }

    var pointer = 0;
    for (var i = 0; i < await res.mainData.length; i++) {
        const id = res.mainData[i].CategoryID;
        const index = (i + 1);
        connector.query(
            `SELECT * from ${sqldetails.table.MenuItems.ref} where ${sqldetails.table.MenuItems.categoryId}=${id}`,
            async function (e, row, f) {
                const fun = async () => {
                    res.mainData[index - 1].itemCount = await row.length;
                    res.mainData[index - 1].course = await row;
                    vari(++pointer, next)

                }
                await fun()
            }
        )
    }

}))

router.get('/', function (req, res) {
    res.send(res.mainData)
})

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({
    extended:true,
}))


router.delete('/',(req,res)=>{
    console.log(req.body);
    var id = req.body["id"];
    const query = `DELETE FROM ${sqldetails.table.MenuItems.ref} WHERE ${sqldetails.table.MenuItems.id} = ${id}`;

    connector.query(query,(e,r,f)=>{
        console.log(r);
        res.send(r);
    })
})

router.post('/update',(req,res)=>{

    const new_id = req.body["menu"]["id"];
    const new_name = req.body["menu"]["name"];
    const new_desc = req.body["menu"]["desc"];
    const new_ser = req.body["menu"]["ser"];
    const new_img_link = req.body["menu"]["img"];
    const new_cat_id = req.body["menu"]["cat_id"];
    const new_price = req.body["menu"]["price"];
    const new_time = req.body["menu"]["time"];
    const new_available = req.body["menu"]["avalability"];


    const query =  `UPDATE ${sqldetails.table.MenuItems.ref} SET ${sqldetails.table.MenuItems.id} = '${new_id}', ${sqldetails.table.MenuItems.name} = '${new_name}', ${sqldetails.table.MenuItems.desc} = '${new_desc}', ${sqldetails.table.MenuItems.ser} = '${new_ser}', ${sqldetails.table.MenuItems.img} = '${new_img_link}', ${sqldetails.table.MenuItems.categoryId} = '${new_cat_id}', ${sqldetails.table.MenuItems.price} = '${new_price}', ${sqldetails.table.MenuItems.time} = '${new_time}', ${sqldetails.table.MenuItems.available} = '${new_available}' WHERE ${sqldetails.table.MenuItems.id}=${new_id}`
    connector.query(query,(e,r,f)=>{
        res.send(r);
    })
})
router.post('/',(req,res)=>{
    // Work here to Add Categories
    
    const new_id = req.body["menu"]["id"];
    const new_name = req.body["menu"]["name"];
    const new_desc = req.body["menu"]["desc"];
    const new_ser = req.body["menu"]["ser"];
    const new_img_link = req.body["menu"]["img"];
    const new_cat_id = req.body["menu"]["cat_id"];
    const new_price = req.body["menu"]["price"];
    const new_time = req.body["menu"]["time"];
    const new_available = req.body["menu"]["avalability"];

    const query = `INSERT INTO ${sqldetails.table.MenuItems.ref} (${sqldetails.table.MenuItems.id}, ${sqldetails.table.MenuItems.name}, ${sqldetails.table.MenuItems.desc}, ${sqldetails.table.MenuItems.ser}, ${sqldetails.table.MenuItems.img}, ${sqldetails.table.MenuItems.categoryId}, ${sqldetails.table.MenuItems.price}, ${sqldetails.table.MenuItems.time}, ${sqldetails.table.MenuItems.available}) VALUES ('${new_id}', '${new_name}', '${new_desc}', '${new_ser}', '${new_img_link}', '${new_cat_id}', '${new_price}', '${new_time}', '${new_available}')`;

    connector.query(query,(e,r,f)=>{
        //console.log(e);
        res.send(r);
    })

})



module.exports = router;