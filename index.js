const express = require('express')
const app = express();
const PORT = 303
const router = express.Router()
const Categories = require('./src/Admin/menu_listing/Categories/Category')
const Menu = require('./src/Admin/menu_listing/Menus/Menu')
const RegisterUser = require('./src/Admin/signing/Register')
const PostFeedback = require('./src/Customer/Feedback/Feedback')
const GetFeedback = require('./src/Admin/GetFeedback/GetFeedback')
const PostOrder = require('./src/Customer/Order/Orders')
const GetOrder = require('./src/Admin/get_orders/GetOrder')
const Login = require('./src/Admin/signing/Login')
const Timings = require('./src/Admin/Timings/Timing')
const SetTerms = require ('./src/Admin/Terms/TermsAndConditions')
const Reports = require ('./src/Admin/Reports/Reports')
const connector = require('./src/_connection/mysqlconnector')
const OrderState = require('./src/Admin/OrderState/OrderState')

connector.connect()

//See Body Object Details from reference route files

app.use('/admin/categories/', Categories) //GET, POST, DELETE
app.use('/admin/menu/', Menu) //GET, POST, DELETE
app.use('/register/', RegisterUser)
app.use('/postfeedback/', PostFeedback)
app.use('/getFeedback/', GetFeedback)
app.use('/postOrder/', PostOrder)
app.use('/getOrder/', GetOrder)
app.use('/login/', Login)
app.use('/timings/', Timings)
app.use('/setTerms/', SetTerms)
app.use('/reports/', Reports)
app.use('/updateOrderState', OrderState) //POST


app.listen(PORT)