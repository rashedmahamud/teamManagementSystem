const TeamService = require('../services/team-service');
const {PublishMessage} = require('../utils');
const UserAuth = require('./middlewares/auth')
const{SHOPPING_BINDING_KEY, CUSTOMER_BINDING_KEY} = require('../config');
const { json } = require('stream/consumers');
const { JsonWebTokenError } = require('jsonwebtoken');
const {PublishteUserEvent} = require('../api/app-events')

module.exports = (app) => {
    
    const service = new TeamService();


    app.post('/create', async(req,res,next) => {
        
        try {
            const { name, desc,banner,category ,available} = req.body; 
            // validation
            const { data } =  await service.CreateTeam({ name, desc, category,available, banner});

            const {dataa} = await service.GetTeamPayload(_id,{teamId:req.body._id},'TEST')
             PublishteUserEvent(dataa);
            return res.json(data);
            
        } catch (err) {
            next(err)    
        }
        
    });

    app.get('/category/:type', async(req,res,next) => {
        
        const category = req.params.type;
        
        try {
            const { data } = await service.GetTeamssByCategory(category)
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.get('/:id', async(req,res,next) => {
        
        const teamId = req.params.id;

        try {
            const { data } = await service.GetTeamDescription(teamId);
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });

    app.post('/ids', async(req,res,next) => {

        try {
            const { ids } = req.body;
            const teams = await service.GetSelectedTeams(ids);
            return res.status(200).json(teams);
            
        } catch (err) {
            next(err)
        }
       
    });
     
   

    //get Top products and category
    app.get('/', async (req,res,next) => {
        //check validation
        try {
            const { data} = await service.GetTeams();        
            return res.status(200).json(data);
        } catch (error) {
            next(err)
        }
        
    });
    
}