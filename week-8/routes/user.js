const UserRouter = express.Router();
UserRouter.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

UserRouter.post("/user/signup", async function(req,res){
    const username =  req.body.username;
    const password =  req.body.password;
    const name = req.body.name;

    await UserModel.create({
        username: username,
        password: password,
        name: name 
    })
    res.json({
        message: "You are signed up"
    })
    
})

UserRouter.post("/user/signin", async function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    
    const user  = await UserModel.findOne({
        username : username
    })

    if(user){
        const token = jwt.sign({
            id: user._id.toString()
        })
    }

})

router.get("/user/courses", function(req,res){ 

})

module.exports = {
     UserRouter: UserRouter
}