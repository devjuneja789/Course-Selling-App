const userRouter = express.Router();
userRouter.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

userRouter.post("/user/signup", async function(req,res){
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

userRouter.post("/user/signin", async function(req,res){
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

module.exports = {
     userRouter: userRouter
}