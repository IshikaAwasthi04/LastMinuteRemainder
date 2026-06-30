const express=require("express");
const router=express.Router();
const Task=require("../models/Task");

//save data
router.post("/",async (req,res)=>{
         try{
            const task=new Task(req.body);
            await task.save();
            res.status(201).json({
      success: true,
      message: "Task Saved",
      task
    });

        }catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
       
  }  );



  
  //update one days's completion
  router.put("/:taskId/day/:day", async (req, res) => {
  try {
    const { taskId, day } = req.params;
    const { completed } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const scheduleDay = task.schedule.find(
      (item) => item.day == day
    );

    if (!scheduleDay) {
      return res.status(404).json({
        success: false,
        message: "Day not found",
      });
    }

    scheduleDay.completed = completed;

    await task.save();

    res.json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/latest", async (req, res) => {

    try {

        const latestTask = await Task.findOne()
            .sort({ createdAt: -1 });

        if (!latestTask) {

            return res.status(404).json({

                message: "No tasks found"

            });

        }

        res.json(latestTask);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});

  module.exports = router;