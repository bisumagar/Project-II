const userService = require("../service/userService");

const getUserProfile = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).send({ error: "Not authenticated" });
        }
        const userObj = user.toObject ? user.toObject() : user;
        const { password, ...profile } = userObj;
        return res.status(200).send(profile);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const getAllUsers=async(req,res)=>{
    try {
        const users=await userService.getAllUsers();
        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send({error:error.message});
        
    }
}
module.exports={getUserProfile,getAllUsers};