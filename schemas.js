const Joi = require('joi');
	

module.exports.teamSchema = Joi.object({
team: Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    image: Joi.string().required(),
    cost: Joi.number().required().min(0),
    description: Joi.string().required(),
    sport: Joi.string().required(),
    league: Joi.string().required(),
    level: Joi.string().required()
}).required()
});