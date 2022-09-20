const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt')
module.exports.create= function(req,res){
    
    // if (req.body.password !=req.body.confirm_password){
    //     return res.json(422,{   //error code 422: invalid input
    //         message:"User pass and confirm pass is not matching"
    //     });
    // }
    User.findOne({email:req.body.email},function(err,user){
       
        if(err){
            console.log('********',err);
            return res.json(500,{
            message:"Error in finding the user"
        });
        }
        if (!user){

            User.create(req.body,function(err,user){
                if(err){
                    console.log('********',err);
                    return res.json(500,{
                    message:"Error in finding the user"
                });
                }
                user.save();
                console.log('user created');
                return res.json(200,{
                    message:'User created',
                })
            })

                
        }else{
           
            console.log('user exists');
            return res.json(409,{    //409 if the entity already exists 
                message:'user already exists'
            })
        }
    });
}
module.exports.createSession=async function(req,res){
    try{
        // console.log(req.body.email)
        let user=await User.findOne({email:req.body.email});
        
        const match = await bcrypt.compare(req.body.password, user.password);
        console.log(match);
        if (!user || match==false){
            console.log(match);
            
            console.log("******")
            return res.json(422,{   //error code 422: invalid input
                message:"Invalid username or password"
            });
        }
        
        
        return res.json(200,{
            message:'Sign in successful',
            data:{
                token:jwt.sign(user.toJSON(),'0s9e0c6r2e0t01',{expiresIn:'1000000'})
            }
        })
    }catch{
        console.log('********');
        return res.json(500,{   //unexpected error
            message:"Internal Server Error"
        });
    }
}
module.exports.userinfo=function(req,res){
    console.log(req.user.id,req.params.id);
    if (req.user.id==req.params.id){
        User.findById(req.params.id,function(err,user){
            if (err){
                
                    console.log('********',err);
                    return res.json(500,{
                    message:"Internal Server error"
                });
                
            }
            if (!user){
                console.log('********USER NOT FOUND************');
                    return res.json(404,{
                    message:"USER NOT FOUND"
                });
            }
            else{
                return res.json(200,{
                    message:'Here is the user information',
                    data:{
                        _id:user._id,
                        name:user.name,
                        email:user.email,
                        created_At:user.createdAt
                    }
                })
            }
        })
    }else{
        console.log('********UNAUTHORIZED************');
                return res.json(401,{   //unauthorized
                    message:"YOU ARE UNAUTHORIZED TO VIEW SOME OTHER USER'S INFORMATION"
                });
    }
    
}

module.exports.update=function(req,res){
    console.log(req.user.id)
    if (req.user.id==req.params.id){
        User.findById(req.params.id,function(err,user){
            if (err){
                
                console.log('********',err);
                return res.json(500,{
                message:"Internal Server error"
            });
            
        }if (!user){
            console.log('********USER NOT FOUND************');
                return res.json(404,{
                message:"USER NOT FOUND"
            });
        }else{
            if (req.body.name){
                user.name=req.body.name;
            }if (req.body.email){
                user.email=req.body.email; 
            }if (req.body.password){
                user.password=req.body.password; 
            } 
            user.save();
            return res.json(200,{
                message:"USER UPDATED",
                userinf:{
                    name:req.body.name,
                    email:req.body.email
                }
            }) 
            }
        })
    }else{
        console.log('********UNAUTHORIZED************');
        return res.json(401,{   //unauthorized
            message:"YOU ARE UNAUTHORIZED TO VIEW SOME OTHER USER'S INFORMATION"
        });
    }
}
