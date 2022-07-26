const sqldetails = {
    configs: {
        host:'localhost',
        user:'root',
        password:'',
        database:'clicktoeat'
    },

    table:{
        category: {
            ref: 'category',
            id: 'cat_id',
            name: 'cat_name',
            description: 'cat_desc'
        },
        MenuItems: {
            ref: 'courses',
            id: 'course_id',
            name: 'course_name',
            desc: 'course_desc',
            ser: 'servings',
            img: 'img',
            categoryId: 'cat_id',
            price: 'serving_price',
            time: 'time_req',
            available: 'availability'
        },
        detail: {
            ref: 'detail',
            detailId: 'detail_id',
            quantityId: 'qty_id'
        },
        feedback: {
            ref: 'feedback',
            feedbackId: 'feedback_id',
            TableNo: 'Table_No',
            sessionId: 'session_id',
            rating: 'rating_constant',
            desc: 'feedback_desc',
        },
        orders: {
            ref: 'orders',
            orderId: 'order_id',
            state: 'order_state_constant',
            details: 'details',
            netTotal: 'order_net_total',
            uName: 'u_name',
            date:'_date'
        },
        qty: {
            ref: 'qty',
            quantityId: 'qty_id',
            courseId: 'course_id',
            qty: 'quantity',
            price: 'price'
        },
        session: {
            ref: 'session',
            sId: 'session_id',
            userId: 'u_id',
            OrderId: 'order_id',
            state: 'state_constant'
        },

        users: {
            ref: 'users',
            userId: 'u_id',
            username: 'u_name',
            userPass: 'u_pass',
            type: 'u_type_const'
        },

        timings:{
            ref: 'timings',
            Id:'Id',
            Mon: 'Monday',
            Tue: 'Tuesday',
            Wed: 'Wednesday',
            Thurs:'Thursday',
            Fri: 'Friday',
            Sat: 'Saturday',
            Sun: 'Sunday',
        },
        terms:{
            ref:'terms',
            Id:'Id',
            desc:'Conditions'
        }

    }
    
}

module.exports = sqldetails;