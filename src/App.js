import "./index.css"
import Header from "./components/Header"
import Siderbar from "./components/Siderbar"
import Tasks from "./components/Tasks";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Footer from "./components/Footer";
import About from "./components/About";


function App() {
  const [ tasks, setTasks ] = useState([])

  useEffect(() => {
    fetch('http://localhost:8081/tasks/')
    .then(res => res.json())
    .then(data => setTasks(data))
    .catch(err => console.log(err));
  }, [])

  //delete task
  const deleteTask = async (id) => {
    setTasks(
      tasks.filter((task) => task.id !== id)
    )

    try {
      //asetetaan id data objektiin
      const data = {
        id: id
      }

      const response = await fetch('http://localhost:8081/tasks/', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then((res) => res.json())
      .catch((err) => console.log(err));

      const result = await response.json;
      console.log("Succeed:", result)
    } catch (error){
      console.error("Error:", error);
    }
  }

  //UPDATE `tasks` SET `reminder` = '1' WHERE `tasks`.`id` = 1;
  //toggle reminder
  const toggleReminder = async (id) => {
    setTasks(
      tasks.map((task) => {
        if(task.id === id){
          return {...task, reminder: !task.reminder}
        } else {
          return task
        }
      })
    )

    try  {
      //selvitetään reminder
      let reminderState;
      tasks.map((task) => {
        if(task.id === id){
          reminderState = !task.reminder;
          return task
        } else {
          return task
        }
      })

      //asetetaan id ja reminder data objektiin
      const data = {
        id: id,
        reminder: (reminderState ? '1' : '0')
      }

      const response = await fetch('http://localhost:8081/tasks/', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
      })
      .then((res) => res.json())
      .catch((err) => console.log(err));

      const result = await response.json;
      console.log("Succeed:", result)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  //add task
  const addTask = async (task) => {
    /* const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask]) */

    try {
      //asetetaan id data objektiin
      const data = {
        name: task.name,
        description: task.description,
        reminder: task.reminder
      }

      const response = await fetch('http://localhost:8081/tasks/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then((res) => res.json())
      .catch((err) => console.log(err));

      const result = await response.json;

      //tähän tulee fecht kysely serverille jolla saadaan task:in id joka asetetaan seuravalla rivillä -> { id, task... }
      setTasks([...tasks, task]);

      console.log("Succeed:", result)
    } catch (error){
      console.error("Error:", error);
    }
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

          {/* <table>
            <thead>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Reminder</th>
            </thead>
            <tbody>
              {tasks.map((task, i) => {
                return (
                <tr key={i}>
                  <td>{task.id}</td>
                  <td>{task.name}</td>
                  <td>{task.dascription}</td>
                  <td>{task.reminder}</td>
                </tr>
                )
              })}
            </tbody>
          </table> */}

        <Footer />
      </Router>
    </>
  );
}

export default App;