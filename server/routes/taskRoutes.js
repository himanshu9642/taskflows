const express = require("express");
const router = express.Router();

const Task = require("../models/task");



// Create Task
router.post("/", async (req, res) => {

  try {


    const { 
      title, 
      description, 
      project, 
      assignedTo,
      priority 
    } = req.body;



    const task = await Task.create({

      title,
      description,
      project,
      assignedTo,
      priority

    });



    res.status(201).json({

      message: "Task created successfully",
      task

    });



  } catch(error) {


    res.status(500).json({

      message:error.message

    });


  }

});






// Get All Tasks
router.get("/", async(req,res)=>{

  try{


    const tasks = await Task.find()
      .populate("project")
      .populate("assignedTo");



    res.json(tasks);



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }

});







// Get Tasks By Project
router.get("/project/:projectId", async(req,res)=>{


  try{


    const tasks = await Task.find({

      project:req.params.projectId

    });



    res.json(tasks);



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }


});








// Update Task
router.put("/:id", async(req,res)=>{


  try{


    const task = await Task.findByIdAndUpdate(

      req.params.id,

      {

        title:req.body.title,
status:req.body.status,
priority:req.body.priority

      },

      {

        new:true

      }

    );



    res.json({

      message:"Task updated successfully",
      task

    });



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }


});








// Delete Task
router.delete("/:id", async(req,res)=>{


  try{


    await Task.findByIdAndDelete(req.params.id);



    res.json({

      message:"Task deleted successfully"

    });



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }


});







module.exports = router;