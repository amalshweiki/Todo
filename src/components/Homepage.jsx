import { useState, useEffect } from "react";
const Homepage = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
    const storTasks = localStorage.getItem("todos");
    if (storTasks) {
      setTasks(JSON.parse(storTodo));
    }
  }, []);
  const addTask = () => {
    const newTask = {
      title: title,
      id: Math.floor(Math.random() * 100000),
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTitle("");
  };
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask();
  };
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const removeItem = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };
  const editItem = (id) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: true,
          };
        }
        return task;
      });
    });
  };
  return (
    <>
      <form className="border border-info p-3 my-4 " onSubmit={handleSubmit}>
        <h1 className="text-center display-4">Add New Task</h1>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={title}
            placeholder="Type Title of Task"
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn  btn-info btn-lg ">
            Submit
          </button>
        </div>
      </form>
      <ul>
        {tasks.map((task) => (
          <li className="border p-3" key={task.id}>
            {task.title} - {task.completed ? "Completed" : "Not Completed"}
            <button
              className="btn btn-danger float-end me-2"
              onClick={() => removeItem(task.id)}
            >
              Delete
            </button>
            <button
              className="btn btn-info float-end me-2"
              onClick={() => editItem(task.id)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Homepage;
