module.exports = {
    
paths: {
    "/create": {
        post: {
            tags: ["Tasks"],
            description: "Create a new task",
            operationId: "create",
            parameters: [],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Task",
                        },
                    },
                },
            },
            responses: {
                201: { description: "Task created successfully" },
                500: { description: "Server error" },
            },
        },
    },

    
    "/markAsCompleted/{_id}": {
        put: {
            tags: ["Tasks"],
            description: "Mark a task as completed",
            operationId: "markAsCompleted",
            parameters: [
                {
                    name: "_id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                    },
                    description: "ID of the task to mark as completed",
                },
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                completed: { type: "boolean" },
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: "Task updated successfully" },
                500: { description: "Server error" },
            },
        },
    },

    "/id/{_id}": {
        delete: {
            tags: ["Tasks"],
            description: "Delete a task by its ID",
            operationId: "deleteTask",
            parameters: [
                {
                    name: "_id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                    },
                    description: "ID of the task to delete",
                },
            ],
            responses: {
                200: { description: "Task deleted successfully" },
                404: { description: "Task not found" },
                500: { description: "Server error" },
            },
        },
        },


},
};
