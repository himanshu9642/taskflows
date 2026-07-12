const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema(
  {

    title: {
      type: String,
      required: true
    },


    description: {
      type: String
    },


    status: {
      type: String,
      default: "Pending"
    },


    priority: {
      type: String,
      default: "Medium"
    },


    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },


    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }

  },

  { 
    timestamps: true 
  }

);


module.exports = mongoose.models.Task || mongoose.model("Task", taskSchema);