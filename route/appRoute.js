const appConfig = require("../config/appConfig");

const express = require("express");
const appController = require("../controller/appController");
// const authorization = require('../middleware/auth');

let setAppRouter = (app) => {
  let baseUrl = appConfig.apiVersion + "/todoTask";
  console.log(baseUrl);

  app.get(baseUrl + "/hello", appController.sayHello);

  app.post(baseUrl + "/createUser", appController.createUser);

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

  app.post(baseUrl + "/createTask", appController.createTask);
  /**
     * @apiGroup Create
     * @apiVersion  1.0.0
     * @api {post} /api/v1/todoTask/createTask api for creating user account.
     *
     * @apiParam {string} title title of the task. (body params) (required)
     * @apiParam {string} description description of the task. (body params) (required)
     * @apiParam {string} status status of the task. (body params) (required) {active/completed}
     * @apiParam {string} user_type type of the user. only admin can add tasks type: {admin:1,non_admin:2}
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Adding Task Successfully.",
            "status": 200,
            "data": {
                "title": "string",
                "description": "string",
                "status": "string",
                "_id": "string",
                "timestamps": "date"
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

  app.post(baseUrl + "/createSubTask/:taskId", appController.createSubTask);
  /**
     * @apiGroup Create
     * @apiVersion  1.0.0
     * @api {post} /api/v1/todoTask/createSubTask/:taskId api for creating user account.
     *
     * @apiParam {string} title title of the task. (body params) (required)
     * @apiParam {string} status status of the task. (body params) (required) {active/completed}
     * @apiParam {string} user_type type of the user. only admin can add tasks type: {admin:1,non_admin:2}
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Adding sub Task Successfully",
            "status": 200,
            "data": {
                "title": "string",
                "description": "string",
                "status": "string",
                "_id": "string",
                "timestamps": "date"
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

  app.get(baseUrl + "/getTasks", appController.getAllTasks);
  /**
     * @apiGroup GET
     * @apiVersion  1.0.0
     * @api {post} /api/v1/todoTask/getTasks api for creating user account.
     *
     * @apiParam {string} title title of the task. (body params) (required)
     * @apiParam {string} status status of the task. (body params) (required) {active/completed}
     * @apiParam {string} user_type type of the user. only admin can add tasks type: {admin:1,non_admin:2}
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
      *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Updated Successfully.",
	    "status": 200,
	    "data": [
					{
						title: "string",
						status: "string",
						description: "string",
						timestamps: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
    */
  app.put(baseUrl + "/updateTasks/:taskId", appController.updateTaks);
  


  app.put(baseUrl + "/updateSubTasks/:sub_taskId", appController.updateSubTasks);


  app.delete(baseUrl + "/deletTask/:taskId", appController.deleteTask);

  app.delete(baseUrl + "/deletSubTask/:sub_taskId",appController.deleteSubTasks);

};

module.exports = {
  setAppRouter: setAppRouter,
};
