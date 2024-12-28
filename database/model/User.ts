import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  emailOtp: String,
  isVerified: Boolean,
  created_at: Date,
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password; // Remove the password field from the returned object
    return ret;
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
