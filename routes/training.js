const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');



const Training = require('../models/training');

router.post("/all", (req,res,next) => {
    Training.find()
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json({
            result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.post("/all/:trainingGoal", (req,res,next) => {
    Training.find({ trainingGoal: req.params.trainingGoal })
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json({
            result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})


// get product by product id
router.post('/id/:trainingId', (req,res,next) => {
    const id = req.params.trainingId
    Training.findById(id)
    .exec()
    .then(result => {
        console.log(result)
        if(result){
            res.status(200).json({
                _id: result._id,
                name: result.name,
                description: result.description,
                trainingGoal: result.trainingGoal
            })
        } else {
            res.status(404).json({
                message: "Not found"
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error:err})
    })
})

router.post('/create', (req,res,next) => {
    const newTraining = new Training({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        trainingGoal: req.body.trainingGoal
    })
    newTraining
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Training created',
            created: newTraining
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err,
        })
    })
})

router.post('/delete/:trainingId', (req,res,next) => {
    const id = req.params.trainingId
    Training.findByIdAndRemove(id)
    .exec()
    .then(result => {
        res.status(200).json({
            message: "training deleted"
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

router.post('/update/:trainingId', (req,res,next) => {
    const id = req.params.trainingId
    Training.findByIdAndUpdate(id , {$set: req.body} , {new: true})
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json(
            result
            )
        })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})


module.exports = router;