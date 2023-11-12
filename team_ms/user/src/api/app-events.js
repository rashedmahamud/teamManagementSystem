const { json } = require('express');
const UserService = require('../services/user-service');

module.exports =(app) =>{

    const service = new UserService();

    app.use('/app-events',async ( req,res,next)=>{

         const {payload} = req.body;
         service.SubscribeEvents(payload);
         console.log("============= User Service reveived Event ========");
         return res.status(200).json(payload);

    });
}