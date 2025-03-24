
export const signup=(req,res)=>{
    const {fullName,email,password}=req.body;
    try{

    }
    catch(error){

    }
}

export const Login=(req,res)=>{
    res.send("login route");
}

export const Logout=(req,res)=>{
    res.send("logout route")
}
