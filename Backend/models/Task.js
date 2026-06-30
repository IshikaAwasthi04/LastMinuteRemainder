const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({

taskName:String,

deadline:Date,

hours:Number,

occupation:String,

availableHours:Number,

weekendFree:Boolean,

workDays:Number,

schedule: [
  {
    day: Number,
    task: String,
    hours: Number,
    time: String,
    difficulty: String,
    completed: {
      type: Boolean,
      default: false
    }
  }
]

},{
    timestamps:true
});


module.exports = mongoose.model("Task", taskSchema);