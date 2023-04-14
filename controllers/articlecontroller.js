const User=require("../models/User");
const Article=require("../models/Article");


const getarticles=async(req,res)=>
{
    try{
    const  data = await Article.find().populate("createdBy");

    const result={
      
        statusCode:null,
        data:{
            data
        }
       
    }

    return res.status(201).json({...result,statusCode:201});
}
catch(err)
{
    return res.status(500).json({statusCode:500,error:err});
}
};
const createarticle=async(req,res)=>
{
   
     try {
        const {title,description}=req.body;
     const userId =req.params.userId ;
        const newArticle = new Article({
          title,
          description,
         createdBy: userId
         
        });
        const data = await newArticle.save();

        const result=
        {
            statusCode:null,
            data:
            {
                data
            }
        }
        
    
        return res.status(201).json({ ...result,statusCode:201 });
      } catch (err) {
        return res.status(500).json({statusCode:500,error:err});
      }
};

module.exports={getarticles,createarticle};