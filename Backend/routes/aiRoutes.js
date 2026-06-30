const express=require("express");
const router=express.Router();
const Task = require("../models/Task");
require("dotenv").config()
const { GoogleGenAI } = require("@google/genai");

const ai=new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY,});





router.post("/generate-plan", async (req, res) => {

    try {

        const {

            taskName,
            deadline,
            hours,
            occupation,
            availableHours,
            weekendFree,
            workDays

        } = req.body;

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const deadlineDate = new Date(deadline);

        deadlineDate.setHours(0, 0, 0, 0);

        const difference =
            deadlineDate.getTime() - today.getTime();

        const totalDaysAvailable =
            Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;

        if (workDays > totalDaysAvailable) {

            return res.status(400).json({

                message: `Only ${totalDaysAvailable} day(s) are available before the deadline.`

            });

        }

        const prompt = `act as an ai productivity coach and help to create a realistic schedule for the user according to the details given:

Create a SHORT and EASY-TO-READ productivity schedule.

User Details:
📌 Task: ${taskName}
📅 Deadline: ${deadline}
⏳ Total Hours Required: ${hours}
👨‍💻 Occupation: ${occupation}
🕒 Available Hours Per Day: ${availableHours}
🌴 Weekend Free: ${weekendFree}
📆 Preferred Working Days: ${workDays}
Today's Date: ${today}

Instructions:

1. Keep the response under 180 words.
2. Do NOT write long paragraphs.
3. Divide the work day-wise.
4. Each day must be on a separate line.
5. Use this exact format:

📅 Day 1: ...
📅 Day 2: ...
📅 Day 3: ...

6. Add one Buffer Day.
7. Add one short motivational quote with one emoji.
8. Add one productivity tip with one emoji.
9. If the deadline is difficult, write:
⚠️ Warning: ...
Otherwise write:
✅ Deadline is achievable.
10. Use only relevant emojis.
11. Do NOT use Markdown headings (#, ##, **, etc.).
12. Keep each day's description to one short sentence only.

The output should look similar to this:

📅 Day 1: Research DBMS concepts (3 hrs)

📅 Day 2: Practice SQL Queries (3 hrs)

📅 Day 3: Complete Assignment (2 hrs)

📅 Buffer Day: Final revision and corrections.

💪 Motivation like: Small progress every day beats last-minute stress!

💡 Tip: Turn off notifications while working.

✅ Deadline is achievable.

Return exactly in this format:

{
  "priority":"High",
  "deadlineStatus":"Achievable",
  "motivation":"Keep moving forward 💪",
  "tip":"Avoid distractions 📵",
  "bufferDay":"Final revision",
  "schedule":[
      {
        "day":1,
        "task":"Study ER Diagram",
        "hours":3,
        "completed":false
      },
      {
        "day":2,
        "task":"Practice SQL",
        "hours":3,
        "completed":false
      }
  ]
}
`;

        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: prompt

        });

        const text = response.text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const schedule = JSON.parse(text);

        const task = await Task.create({

            taskName,

            deadline,

            hours,

            occupation,

            availableHours,

            weekendFree,

            workDays,

            schedule: schedule.schedule

        });

        res.status(200).json({

            success: true,

            schedule,

            taskId: task._id

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});
   
router.post("/recreate-plan", async (req, res) => {

    try {

        const { taskId } = req.body;

        const task = await Task.findById(taskId);

        if (!task) {

            return res.status(404).json({

                success:false,

                message:"Task not found"

            });

        }

        const completedTasks = task.schedule.filter(day => day.completed);

        const remainingTasks = task.schedule.filter(day => !day.completed);

        if(remainingTasks.length===0){

            return res.json({

                success:true,

                message:"All tasks are already completed."

            });

        }

        const today = new Date();

        const deadline = new Date(task.deadline);

        const remainingDays = Math.ceil(

            (deadline - today)/(1000*60*60*24)

        );

        const prompt = `
You are an AI Productivity Coach.

Task: ${task.taskName}

Occupation: ${task.occupation}

Available Hours Per Day: ${task.availableHours}

Weekend Free: ${task.weekendFree}

Remaining Days: ${remainingDays}

Completed Tasks:
${completedTasks.map(t=>"- "+t.task).join("\n")}

Pending Tasks:
${remainingTasks.map(t=>"- "+t.task).join("\n")}

Return JSON only:

{
"priority":"High",
"deadlineStatus":"Achievable",
"motivation":"Stay consistent 💪",
"tip":"Avoid distractions 📵",
"bufferDay":"Revision",
"schedule":[
{
"day":1,
"task":"Task",
"hours":2,
"completed":false
}
]
}
`;

        const response = await ai.models.generateContent({

            model:"gemini-2.5-flash",

            contents:prompt

        });

        const text = response.text
        .replace(/```json/g,"")
        .replace(/```/g,"")
        .trim();

        const newSchedule = JSON.parse(text);

        await Task.findByIdAndUpdate(

            taskId,

            {

                schedule:newSchedule.schedule

            }

        );

        res.json({

            success:true,

            schedule:newSchedule

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

});

   
       
module.exports=router;
