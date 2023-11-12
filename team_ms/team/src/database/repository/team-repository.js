const { TeamModel } = require("../models");
const { APIError, BadRequestError } = require("../../utils/app-errors");

//Dealing with data base operations
class TeamRepository {
  async CreateTeam({
    name,
    desc,
    banner,
    category,
    available
  }) {
    try {
      const team = new TeamModel({
        name,
        desc,
        banner,
        category,
        available
      
      });

      const teamResult = await team.save();
      return teamResult;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Team"
      );
    }
  }

  async Teams() {
    try {
      return await TeamModel.find();
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Teams"
      );
    }
  }

  async FindById(id) {
    try {
      return await TeamModel.findById(id);
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Team"
      );
    }
  }

  async FindByCategory(category) {
    try {
      const teams = await TeamModel.find({ category: category });
      return teams;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Category"
      );
    }
  }

  async FindSelectedTeams(selectedIds) {
    try {
      const teams = await TeamModel.find()
        .where("_id")
        .in(selectedIds.map((_id) => _id))
        .exec();
      return teams;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Team"
      );
    }
  }
}

module.exports = TeamRepository;
