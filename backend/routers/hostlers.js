const express = require('express')
const Hostler = require('../models/hostlers')
const ToClean = require('../models/CleaningRecord')

const route = new express.Router()

route.post('/hostlerlogin', async (req, res)=>{

    try{
    console.log(req.body)
    const hostler = await Hostler.findByCredentials(req.body.rollnumber, req.body.password)
    // req.session.rollnumber = hostler.rollnumber
    
    res.send(hostler)

    }
    catch(e){
        console.log(e)
        res.send(e)
    }
})


route.post('/CleaningRequest', async (req, res)=>{

    const { rollnumber } = req.body
    console.log(rollnumber)

try{

    const hostler = await Hostler.findOne({rollnumber})
    console.log(hostler)

    const newReq = new ToClean({request: req.body.request, room: hostler.roomnumber, hostel: hostler.hostel})
    await newReq.save()

    console.log(newReq)
    res.status(200).send(newReq)

}
catch(e){

    console.log(e)
    res.status(400).send(e)

}
})

route.get('/FetchAllHostlerReq', async (req, res)=>{

const { rollnumber } = req.body

console.log(rollnumber)
try{
    const hostler = await Hostler.findOne({rollnumber})
    console.log(hostler)
    const requests = await ToClean.find({hostel: hostler.hostel, room: hostler.roomnumber})
    console.log(requests)
    res.send(requests)
    
}

catch(e){

    console.log(e)
    res.send(e)

}
})

module.exports = route