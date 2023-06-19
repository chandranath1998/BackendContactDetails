const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const adminSchema = new mongoose.Schema(
  {
    contact : {
       type: ObjectId,
       ref: "UserContact"
    },
    email: {
      type: String,
      required: true,
    },
    password: {
        type:String,
        required:true
    }
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("adminDetails", adminSchema);
