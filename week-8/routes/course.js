const CourseRouter = express.Router();

CourseRouter.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

CourseRouter.post("/course/purchase", function(req,res){

})

CourseRouter.get("/course", function(req,res){

})