import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.post('/', (req, res) => {
    const name = req.body.name;
    // User.findAndModify(query, updates, opts, (err, result) => {
    //     console.log("Result :", result)
    //     if (err) return res.status(400).json({ success: false, err })
    //     if (!result) {
    //         result = new User({
    //             name: req.body.name
    //         })
    //     }
    //     result
    //         .save()
    //         .then( result => {
    //             console.log(result)
    //             res.status(201).json({"message": message});
    //         })
    //         .catch(err => {
    //             res.status(400).json({error: err})
    //         })
    // });
    
    User.exists({"name": name}).then(exists => {
        if (exists) {
            User.find({"name": req.body.name})
            .exec((err, users) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success:true, users })
            })
        } else {
            const user = new User({
                "name": name
            })
            user.save((err, users) => {
                if (err) return res.json({success:false, err})
                User.find({"name": users.name})
                    .exec((err, users) => {
                        if (err) return res.status(400).json({ success: false, err })
                        res.status(200).json({ success:true, users })
                    })
    
            })
        }
    });
    // console.log("User exists: ", exist);
    // if (exist === 1) {
    //     const user = new User({
    //         "name": name
    //     })
    //     user.save((err, users) => {
    //         if (err) return res.json({success:false, err})
    //         console.log("User from userinfo: ", users)
    //         User.find({"name": users.name})
    //             .exec((err, users) => {
    //                 if (err) return res.status(400).json({ success: false, err })
    //                 res.status(200).json({ success:true, users })
    //             })

    //     })
        
    // } else {
    //     User.find({"name": req.body.name})
    //         .exec((err, users) => {
    //             if (err) return res.status(400).json({ success: false, err })
    //             res.status(200).json({ success:true, users })
    //         })
    // }
})

export default router;