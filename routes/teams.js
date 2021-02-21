const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { teamSchema } = require('../schemas.js');

const ExpressError = require('../utils/ExpressError');
const Team = require('../models/team');


const validateTeam = (req, res, next) => {
    const { error } = teamSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', catchAsync(async (req, res) => {
    const teams = await Team.find({});
    res.render('teams/index', { teams })
}));

router.get('/new', (req, res) => {
    res.render('teams/new');
})

// setting up end point these teams as a post where the form is submitted
router.post('/', validateTeam, catchAsync(async (req, res, next) => {
    // if (!req.body.team) throw new ExpressError('Invalid Team Data', 400);
    const team = new Team(req.body.team); 
    await team.save();    
    req.flash('success', 'Successfully made a new team!');
    res.redirect(`/teams/${team._id}`)
}))

router.get('/:id', catchAsync(async (req, res,) => {
    const team = await Team.findById(req.params.id)
    if (!team) {
        req.flash('error', 'Cannot find that team!');
        return res.redirect('/teams');
    }
    res.render('teams/show', { team });
}));

router.get('/:id/edit', catchAsync(async (req, res) => {
    const team = await Team.findById(req.params.id)
    if (!team) {
        req.flash('error', 'Cannot find that team!');
        return res.redirect('/teams');
    }
    res.render('teams/edit', { team });
}))


// set up a put route
router.put('/:id', validateTeam, catchAsync(async (req, res) => {
    const { id } = req.params;
    const team = await Team.findByIdAndUpdate(id, { ...req.body.team });
    req.flash('success', 'Sucessfully updated team!');
    res.redirect(`/teams/${team._id}`)
}));

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Team.findByIdAndDelete(id);
    req.flash('success', 'Sucessfully deleted team')

    res.redirect('/teams'); 
})); 

module.exports = router;