import "./index.css"
import Header from "./components/Header"
import Siderbar from "./components/Siderbar"
import Tasks from "./components/Tasks";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Footer from "./components/Footer";
import About from "./components/About";


function App() {

  const [ tasks, setTasks ] = useState([
    {
      id: "b",
      name: "Lounas",
      description: "Syö lounas oikeaan aikaan",
      reminder: true
    },
    {
      id: "a",
      name: "Otsikko",
      description: "Lisätietoja tehtävästä",
      reminder: false
    },
    {
      id: "c",
      name: "Käy kaupassa",
      description: "Käy kaupassa tekemässä ostokset",
      reminder: false
    },
    {
      id: "d",
      name: "Do this task",
      description: "This is important task! Dont forget to do this!",
      reminder: true
    },
    {
      id: "e",
      name: "Add more tasks here",
      description: "Add more example tasks here",
      reminder: false
    }
  ])

  //delete task
  const deleteTask = (id) => {
    setTasks(
      tasks.filter((task) => task.id !== id)
    )
  }

  //toggle reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) => {
        if(task.id === id){
          return {...task, reminder: !task.reminder}
        } else {
          return task
        }
      })
    )
  }

  //add task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  return (
    <>
      <Router>
        <Header />
        <Siderbar onAdd={addTask}/>

        <Routes>
          <Route path="/Task-Manager"
            element={
              <>
                <div className="container">
                  <div className="tasks-container">
                    {tasks.length > 0 ? (
                      <Tasks
                      tasks={tasks}
                      onDoubleClick={toggleReminder}
                      onDelete={deleteTask}
                      />
                    ) : (
                      <div className="no-tasks">
                        <h4>No tasks to show</h4>
                      </div>
                    )}
                  </div>
                </div>
              </>
            }
          />
          <Route path="/About"
            Component={About}
          />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;