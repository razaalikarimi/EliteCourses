import uploadOnCloudinary from "../configs/cloudinary.js";
import User from "../models/userModel.js";

// BUG 3 FIX: Return { user } wrapper so frontend can read result.data.user consistently
export const getCurrentUser = async (req,res) => {
    try {
        const user = await User.findById(req.userId).select("-password").populate("enrolledCourses")
        if(!user){
            return res.status(400).json({message:"user does not found"})
        }
        return res.status(200).json({ user })
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"get current user error"})
    }
}

// BUG 5 FIX: Use { new: true } to get updated user, remove incorrect save() on old object
export const UpdateProfile = async (req,res) => {
    try {
        const userId = req.userId
        const {name , description, customGeminiApiKey} = req.body
        const updateData = { name, description }

        if (customGeminiApiKey !== undefined) {
            updateData.customGeminiApiKey = customGeminiApiKey.trim();
        }

        if(req.file){
            updateData.photoUrl = await uploadOnCloudinary(req.file.path)
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password")

        if(!updatedUser){
            return res.status(404).json({message:"User not found"})
        }
        return res.status(200).json({ user: updatedUser })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`Update Profile Error  ${error}`})
    }
}
