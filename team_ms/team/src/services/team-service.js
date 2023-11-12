const { TeamRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require('../utils/app-errors');

// All Business logic will be here
class TeamService {

    constructor(){
        this.repository = new TeamRepository();
    }

    async CreateTeam(teamInputs){
        try{
            const teamResult = await this.repository.CreateTeam(teamInputs)
            return FormateData(teamResult);
        }catch(err){
            throw new APIError('Data Not found')
        }
    }
    
    async GetTeams(){
        try{
            const teams = await this.repository.Teams();
    
            let categories = {};
    
            teams.map(( {category} ) => {
                categories[category] = category;
            });
            
            return FormateData({
                teams,
                categories:  Object.keys(categories) ,
            })

        }catch(err){
            throw new APIError('Data Not found')
        }
    }


    async GetTeamDescription(teamId){
        try {
            const team = await this.repository.FindById(teamId);
            return FormateData(team)
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetTeamssByCategory(category){
        try {
            const teams = await this.repository.FindByCategory(category);
            return FormateData(teams)
        } catch (err) {
            throw new APIError('Data Not found')
        }

    }

    async GetSelectedTeams(selectedIds){
        try {
            const teams = await this.repository.FindSelectedTeams(selectedIds);
            return FormateData(teams);
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetTeamById(teamId){
        try {
            return await this.repository.FindById(teamId);
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }
    
    async GetTeamPayload(userId,{teamId,name}, event)
    {

        const team = await this.repository.FindById(teamId);
        
        if(team){
            const payload ={

                event:event,
                data:{userId,team,qty}
            }
            return FormateData(payload)
        }else {
            return FormateData({error:"No product avialable"})
        }
        
    }
}

module.exports = TeamService;