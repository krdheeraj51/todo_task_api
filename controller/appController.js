const express = require("express");
const appConfig = require("../config/appConfig");
const response = require("../lib/response");
const mongoose = require("mongoose");
const userModel = mongoose.model("users");
const taskModel = mongoose.model("tasks");
const subTaskModel = mongoose.model("sub_tasks");
let sayHello = (req, res) => {
  res.send("Hello Test APP");
};

/**
     * @apiGroup Create
     * @apiVersion  1.0.0
     * @api {post} /api/v1/todoTask/createUser api for creating user account.
     *
     * @apiParam {string} name name of the user. (body params) (required)
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiParam {string} user_type type of the user. (body params) (required) type: {admin:1,non_admin:2}
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "User Account has been created Successfully.",
            "status": 200,
            "data": {
                "userDetails": {
                "name": "string",
                "email": "string",
                "password": "string",
                "user_type":number
                "_id": "string",
                "__v": 0
            }
        }
          @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500,
	    "data": null
	   }
    */
let createUser = (req, res) => {
  let createNewUser = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    user_type: req.body.user_type,
  });
  createNewUser
    .save()
    .then((result) => {
      let userDetails = { userDetails: result };
      let apiResponse = response.generate(
        false,
        "User Account has been created Successfully.",
        200,
        userDetails
      );
      res.send(apiResponse);
    })
    .catch((err) => {
      console.log("Something going wrong ....");
      let apiResponse = response.generate(true, "Error Occured", 500, null);
      res.send(apiResponse);
    });
};

let createTask = (req, res) => {
  if (req.body.user_type === 1) {
    let addNewTask = new taskModel({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    });
    addNewTask.save((err, taskDetails) => {
      if (err) {
        let apiResponse = response.generate(
          true,
          "Failed to add Task Details",
          500,
          null
        );
        res.send("Something is missing");
      } else {
        let apiResponse = response.generate(
          false,
          "Adding Task Successfully",
          200,
          taskDetails
        );
        res.send(apiResponse);
      }
    });
  } else {
    let apiResponse = response.generate(
      true,
      "Only Admin can add Tasks",
      500,
      null
    );
    res.send(apiResponse);
  }
};

let createSubTask = (req, res) => {
  if (req.body.user_type === 1) {
    let addNewSubTask = new subTaskModel({
      title: req.body.title,
      status: req.body.status,
      taskId: req.params.taskId,
    });
    addNewSubTask.save((err, subTaskDetails) => {
      if (err) {
        let apiResponse = response.generate(
          true,
          "Failed to add Sub Task Details",
          500,
          null
        );
        res.send(apiResponse);
      } else {
        let apiResponse = response.generate(
          false,
          "Adding sub Task Successfully",
          200,
          subTaskDetails
        );
        res.send(apiResponse);
      }
    });
  } else {
    let apiResponse = response.generate(
      true,
      "Only Admin can add Tasks",
      500,
      null
    );
    res.send(apiResponse);
  }
};

const updateTaks = (req, res) => {
  if (req.body.user_type === 1) {
    let dataObj = req.body;
    const id = req.params.taskId;
    let update_data = {};
    if (dataObj.title) update_data.title = dataObj.title;
    if (dataObj.description) update_data.description = dataObj.description;
    if (dataObj.status) update_data.status = dataObj.status;
    taskModel.findByIdAndUpdate(id, update_data, function (err, updatedTask) {
      if (err) {
        let apiResponse = response.generate(
          true,
          "Failed to update Task Details",
          500,
          null
        );
        res.send("Something is missing");
      } else {
        let apiResponse = response.generate(
          false,
          "Task has been updated Successfully",
          200,
          update_data
        );
        res.send(apiResponse);
      }
    });
  } else {
    let apiResponse = response.generate(
      true,
      "Only Admin can update Tasks",
      500,
      null
    );
    res.send(apiResponse);
  }
};

const updateSubTasks = (req, res) => {
  if (req.body.user_type === 1) {
    let dataObj = req.body;
    const id = req.params.sub_taskId;
    let update_data = {};
    if (dataObj.title) update_data.title = dataObj.title;
    if (dataObj.status) update_data.status = dataObj.status;
    subTaskModel.findByIdAndUpdate(
      id,
      update_data,
      function (err, updatedTask) {
        if (err) {
          let apiResponse = response.generate(
            true,
            "Failed to update Sub Task Details",
            500,
            null
          );
          res.send("Something is missing");
        } else {
          let apiResponse = response.generate(
            false,
            "Sub Task has been updated Successfully",
            200,
            update_data
          );
          res.send(apiResponse);
        }
      }
    );
  } else {
    let apiResponse = response.generate(
      true,
      "Only Admin can update Sub Tasks",
      500,
      null
    );
    res.send(apiResponse);
  }
};

const deleteTask = (req, res) => {
  if (req.body.user_type === 1) {
    const id = req.params.taskId;
    taskModel.findByIdAndDelete(id, (err, dataInfo) => {
      if (err) {
        let apiResponse = response.generate(
          true,
          "Failed to delete Task Details",
          500,
          null
        );
        res.send("Something is missing");
      } else {
        console.log("dataInfo ::", dataInfo);
        subTaskModel.find({ taskId: id }).deleteMany().exec();
        let apiResponse = response.generate(
          false,
          "Task has been deleted Successfully",
          200,
          dataInfo
        );
        res.send(apiResponse);
      }
    });
  } else {
    let apiResponse = response.generate(
      true,
      "Only Admin can delete Tasks",
      500,
      null
    );
    res.send(apiResponse);
  }
};

const deleteSubTasks = (req, res) => {
  if (req.body.user_type === 1) {
    if (req.body.user_type === 1) {
      const id = req.params.sub_taskId;
      subTaskModel.findByIdAndDelete(id, (err, dataInfo) => {
        if (err) {
          let apiResponse = response.generate(
            true,
            "Failed to delete Sub Task Details",
            500,
            null
          );
          res.send("Something is missing");
        } else {
          console.log("dataInfo ::", dataInfo);
          let apiResponse = response.generate(
            false,
            "Sub Task has been deleted Successfully",
            200,
            dataInfo
          );
          res.send(apiResponse);
        }
      });
    }
  } else {
    let apiResponse = response.generate(
      true,
      "Only Admin can delete Sub Tasks",
      500,
      null
    );
    res.send(apiResponse);
  }
};

let getAllTasks = (req, res) => {
  var updateTasksArray = [];
  let newTaskObj = {};
  let apiResponse;
  taskModel.find().exec((err, taskInfo) => {
    if (err) {
      apiResponse = response.generate(
        true,
        "Task is not Listed here",
        500,
        null
      );
      res.send(apiResponse);
    } else {
      for (let task of taskInfo) {
        subTaskModel.find({ taskId: task.id }).exec((err, subTaskInfo) => {
          if (err) {
            console.log("Something is missing");
          }
          newTaskObj = {
            task_id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
            timestamps: task.timestamps,
            sub_tasks: subTaskInfo,
          };
          updateTasksArray.push(newTaskObj);
        });
      }
      apiResponse = response.generate(
        false,
        "All Tasks are listed.",
        200,
        taskInfo
      );
      res.send(apiResponse);
    }
  });

  //   console.log("taskInfo 11111 ::", taskList);

  //   for (let task of taskList) {
  //     subTaskModel.find({ taskId: task.id }).exec((err, subTaskInfo) => {
  //       if (err) {
  //         console.log("Something is missing");
  //       }
  //       newTaskObj = {
  //         task_id: task._id,
  //         title: task.title,
  //         description: task.description,
  //         status: task.status,
  //         timestamps: task.timestamps,
  //         sub_tasks: subTaskInfo,
  //       };
  //       updateTasksArray.push(newTaskObj);
  //       console.log("updateTasksArray 0 ::", updateTasksArray);
  //     });
  //     console.log("updateTasksArray 1 ::", updateTasksArray);
  //   }

  //   console.log("updateTasksArray 2 ::", updateTasksArray);

  //   taskModel.find().exec((err, taskInfo) => {
  //     // console.log("Details :::", taskInfo);
  //     if (err) {
  //       apiResponse = response.generate(
  //         true,
  //         "Task is not Listed here",
  //         500,
  //         null
  //       );
  //       res.send(apiResponse);
  //     } else {
  //       console.log("Response list .....");
  //       for (let task of taskInfo) {
  //         subTaskModel.find({ taskId: task.id }).exec((err, subTaskInfo) => {
  //           if (err) {
  //             console.log("Something is missing");
  //           }
  //           newTaskObj = {
  //             task_id: task._id,
  //             title: task.title,
  //             description: task.description,
  //             status: task.status,
  //             timestamps: task.timestamps,
  //             sub_tasks: subTaskInfo,
  //           };
  //           updateTasksArray.push(newTaskObj);
  //           console.log("updateTasksArray 0 ::", updateTasksArray);
  //         });
  //       }
  //     }
  //     apiResponse = response.generate(
  //       false,
  //       "All Books are listed.",
  //       200,
  //       updateTasksArray
  //     );
  //     res.send(apiResponse);
  //   });

  //         .exec((err, bookDetails) => {
  //             console.log("Details :::", bookDetails);
};

// //Update by ID Method
// router.patch('/update/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new: true };

//         const result = await Model.findByIdAndUpdate(
//             id, updatedData, options
//         )

//         res.send(result)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

//Delete by ID Method
// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const data = await Model.findByIdAndDelete(id)
//         res.send(`Document with ${data.name} has been deleted..`)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

// let sellBook = (req, res) => {
//     bookModel.find({ unit: { $gt: 0 } })
//         .exec((err, bookDetails) => {
//             console.log("Details :::", bookDetails);
//             if (err) {
//                 let apiResponse = response.generate(true, 'Book is not listed here.', 500, null);
//                 res.send(apiResponse);
//             } else {
//                 console.log('Response list .....');
//                 let apiResponse = response.generate(false, 'All Books are listed.', 200, bookDetails);
//                 res.send(apiResponse);
//             }
//         })
// }
// let purchaseBook = (req, res) => {
//   console.log("req.params", req.params);
//   bookModel
//     .find({ book_id: req.params.bookId })
//     .exec()
//     .then((bookDetails) => {
//       let purchaseBook = new purchaseModel({
//         email: req.user.email,
//         book_id: req.params.bookId,
//       });
//       purchaseBook
//         .save()
//         .then((bookInfo) => {
//           let purchaseDetails = { purchaseDetails: bookInfo };
//           console.log();
//           let apiResponse = response.generate(
//             false,
//             "Your Order has been done successfully.",
//             200,
//             purchaseDetails
//           );
//           res.send(apiResponse);
//         })
//         .catch((err) => {
//           console.log(err);
//           let apiResponse = response.generate(
//             true,
//             "Error Occured.",
//             500,
//             null
//           );
//           res.send(apiResponse);
//         });
//     })
//     .catch((error) => {
//       let apiResponse = response.generate(
//         true,
//         "Book is not found.",
//         500,
//         null
//       );
//       res.send(apiResponse);
//     });
// };

module.exports = {
  createUser,
  createTask,
  createSubTask,
  getAllTasks,
  updateTaks,
  updateSubTasks,
  deleteTask,
  deleteSubTasks,
  // loginUser: loginUser,
  // addBook: addBook,
  // sellBook: sellBook,
  // purchaseBook: purchaseBook,
  sayHello,
};
