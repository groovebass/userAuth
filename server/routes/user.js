require('dotenv').config()
const express = require("express");
const router = express.Router();
const {User} = require("../models/User");
const {auth} = require("../middleware/auth");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const { success, error } = require("consola");




router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image
    });
});

router.post("/register", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        success({message: "User Successfully registered.", badge: true})
        return res.status(200).json({
          success: true
        });
    } catch (err) {
        error({message: "Encountered Error in User Registration", badge: true})
    }
});

//login
router.post( '/login', async (req,res,next)=> {
    passport.authenticate('local',
    async (err, user,info) => {
        try{
            if (err || !user) {
                error({ message: "An error has occured.", badge: true})
                return next(err);
            }
            req.logIn(user, async (err) => {
                if (err) return next(err);
                const body = {_id: user._id, email: user.email};
                const token = jwt.sign({ user: body}, process.env.HIDE, {expiresIn: '24h'});

                success({message: "Successfully loggeg In", badge: true})
                return res.json({ token});
            });
        } catch (err) {
            return next(err);
        }
    })(req,res,next);
});

//User Logout
router.get("/logout", auth, async (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000');
});


//Get All Users
router.get("/allUsers", async (req,res) => {
    const users = await User.find({});
    success({message: "Users Retrieved Successfully", badge: true})
    res.send(users);
});



router.put("/:id", async (req,res) => {
    const id = req.params.id;

     User.findByIdAndUpdate(id, {$set: req.body}, {new: true, useFindAndModify: false})
     .then(user => {
         if (!user){
            return res.status(404).send({message: `Cannot Update User with id=${id}`});
        } else res.send({message: 'User Details Updated Successfully', user});
     }) .catch ( err => {
        return res.status(500).send({ message: 'Error in Updating User.' + id});
     });
});

//Get one User By ID
router.get("/:id", async (req,res) => {
    const id = req.params.id;
    User.findById(id)
    .then(user => {
        if(!user)
        res.status(404).send({message: "No User found with the ID" + id});
        else res.send(user);
    }).catch( err => {
        error({message: "Error in retrieving User with the ID" + id})
        res.status(500).send({message: "Error in retrieving User with the ID" + id});
    });
});

module.exports = router;



// router.get("/users_by_id", (req,res)=> {
//     let type = req.query.type
//     let userIds = req.query.id

//     console.log("req.query.id", req.query.id)

//     if(type === "array"){
//         let ids = req.query.id.split(',');
//         userIds = [];
//         userIds = ids.map(item => {
//             return item
//         })
//     }
//     User.find({'_id': {$in: userIds}})
//         .exec((err,user) => {
//             if (err) return res.status(400).send(err)
//             return res.status(200).send(user)
//         })
// });