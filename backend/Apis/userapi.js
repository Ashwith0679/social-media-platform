const exp=require('express')
const userapp=exp.Router()
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
require('dotenv').config()
const expressasynchandler = require('express-async-handler');
const verifyToken=require('../middileware/verifytoken')
const { ObjectId } = require('mongodb');


userapp.use(exp.json())
let userscollection,postscollection,friendscollection;
userapp.use((req,res,next)=>{
    userscollection=req.app.get('userscollection')
    postscollection=req.app.get('postscollection')
    friendscollection=req.app.get('friendscollection')
    next()
})

//for registering

userapp.post('/Register',expressasynchandler(async(req,res)=>{
    const newUser=req.body
    //first checkduplicate
    const checkDuplicate=await userscollection.findOne({username:newUser.username})
    if(checkDuplicate===null)
    {
        //hash the password
        const hashThePassword=await bcryptjs.hash(newUser.password,9)
        //set the password to the hash password
        newUser.password=hashThePassword
        //send the info to the db
        const data=await userscollection.insertOne(newUser)
        console.log(data)
        res.send({message:'user registered'})
    }
    else{
        res.send({message:'user already registered'})
    }


}))
//for logging in 

userapp.post('/Login',expressasynchandler(async(req,res)=>{
    const User=req.body
    //check username then proceed
    const checkUsername=await userscollection.findOne({username:User.username})

    if(checkUsername===null)
    {
        res.send({message:"user not registerd"})
    }
    else
    {
        //check the pass by using the bcrypt
        const status=await bcryptjs.compare(User.password,checkUsername.password)
        if(status===false){
            res.send({message:'Invalid password'})
        }
        else{
            const token=jwt.sign({username:checkUsername.username},process.env.SECRET_KEY,{expiresIn:'1d'})
            res.send({message:"user logged in",token:token,user:checkUsername})
        }
    }
}))

//for posting the posts

userapp.post('/AddPost',verifyToken,expressasynchandler(async(req,res)=>{
    const post=req.body
    //console.log(post)
    const result=await userscollection.updateOne({username:post.username},{$addToSet:{posts:post.post}})
    const posts=await postscollection.insertOne(post)
    res.send({message:"post has created",payload:posts&&result})

}))

//to add a new friend

userapp.post('/AddFriend',verifyToken,expressasynchandler(async(req,res)=>{
    const AddnewFriend=req.body
    const user = await userscollection.findOne({ username: AddnewFriend.username });

    if (user && user.friends.includes(AddnewFriend.friend)) {
        console.log("Friend exists in the friend list.");
    } else {
        const result=await userscollection.updateOne({username:AddnewFriend.username},{$addToSet:{friends:AddnewFriend.friend}})
        const friends=await friendscollection.insertOne(AddnewFriend)
        res.send({message:"friend has added",payload:friends&&result})    
    }
    
   
}))


//to get all posts

userapp.get('/Posts',verifyToken,expressasynchandler(async(req,res)=>{
    const result=await postscollection.find().toArray()
    res.send({message:"POsts are ",payload:result})

}))

//to get all posts of a particular user

userapp.get('/Posts/:user',verifyToken,expressasynchandler(async(req,res)=>{
    const user=req.params.user
    const result=await postscollection.find({username:user}).toArray()
    res.send({message:"posts of the user is ",payload:result})

}))

// comenting on a post
userapp.post('/comment', expressasynchandler(async (req, res) => {
    const { _id, username, coment } = req.body;
    const postId = new ObjectId(_id);
    const newComent = { username, coment };
    const result = await postscollection.updateOne(
        { _id: postId },
        { $addToSet: { coments: newComent } }
    );
    console.log(result)
    res.send({ message: "Comment added", payload: result });
}));

  
  

// to get all users

userapp.get('/users',verifyToken,expressasynchandler(async(req,res)=>{
    const result=await userscollection.find({},{projection:{username:1,_id:0}}).toArray()
    res.send({message:"users are",payload:result})
}))



module.exports=userapp