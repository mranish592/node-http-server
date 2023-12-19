const { v4: uuidv4 } = require("uuid");
const express = require("express");

// Todo object
class Todo {
    constructor(name, timestamp) {
        this.name = name;
        this.timestamp = timestamp;
    }
}

// Array of todos
const todos = new Map();

// create a todo
function createTodoFromJson(todo) {
    console.log(`create :: ${JSON.stringify(todo)}`);
    const id = uuidv4();
    const timestamp = Date.now();
    const newTodo = new Todo(todo.name, timestamp);
    todos.set(id, newTodo);
    console.log(`create :: created: ${JSON.stringify(newTodo)}`);
}

// retrieve a todo
function retrieveTodo(index) {
    const result = todos.get(index);
    console.log(`retrieve :: ${result}`);
    return result;
}
// update a todo
function updateTodo(index, newTodoBody) {
    const timestamp = Date.now();
    const newTodo = new Todo(newTodoBody["name"], timestamp);
    const oldTodo = todos.get(index);
    todos.set(index, newTodo);
    const result = todos.get(index);
    console.log(
        `updated :: new:${JSON.stringify(newTodo)}, old:${JSON.stringify(
            oldTodo
        )}`
    );
    return result;
}

// delete a todo
function deleteTodo(index) {
    const deleteTodo = todos.get(index);
    todos.delete(index);
    console.log(`deleted :: ${JSON.stringify(deleteTodo)}`);
    return deleteTodo;
}
// retrieve all todo
function retrieveAllTodos() {
    const jsonArray = Array.from(todos.entries());
    console.log(`retrieve :: ${JSON.stringify(jsonArray)}`);
    return jsonArray;
}

const app = express();
const port = 3000;
app.use(express.json());

// create routes for update retreive.
app.get("/", function (request, response) {
    response.send("Hello from server");
});

app.post("/create", function (request, response) {
    const requestJson = request.body;
    createTodoFromJson(requestJson);
    response.status(200).send(`received ${JSON.stringify(requestJson)}`);
});

app.get("/retrieve", function (request, response) {
    const result = retrieveAllTodos();
    response.status(200).send(JSON.stringify(result));
});

app.get("/retrieve/:todoId", function (request, response) {
    const todoId = request.params.todoId;
    const result = retrieveTodo(todoId);
    response.status(200).send(JSON.stringify(result));
});

app.put("/update/:todoId", function (request, response) {
    const todoId = request.params.todoId;
    const newTodoBody = request.body;
    const result = updateTodo(todoId, newTodoBody);
    response.status(200).send(JSON.stringify(result));
});

app.delete("/delete/:todoId", function (request, response) {
    const todoId = request.params.todoId;
    const result = deleteTodo(todoId);
    response.status(200).send(JSON.stringify(result));
});

// Start the server
app.listen(port, function () {
    console.log(`example node http server listening on ${port}`);
});
console.log("hello there");
