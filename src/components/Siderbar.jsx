import { useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const Siderbar = ({ onAdd }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [reminder, setReminder] = useState(false)
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  const submit = (event) => {
    /* event.preventDefalt(); */

    if(!name){
      alert("Please, enter name of the task")
      return true
    }

    onAdd({ name, description, reminder})

    setName("")
    setDescription("")
    setReminder(false)
  }

  return (
    <div className={`sidebar-container ${visible && "visible"}`}>
      <div className="sidebar-body">
        <header className="sidebar-header">
          <h4>Add task</h4>
        </header>
        <button className={`sidebar-btn ${visible && "visible"}`} title="Sidebar" onClick={toggleVisibility} >
          {visible ? <SlArrowLeft /> : <SlArrowRight />}
        </button>
        <form className="add-task" /* onSubmit={onSubmit} */>
          <div className="form-text">
            <label>Task name</label>
            <input
              type="text"
              placeholder="Task name here"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-text">
            <label>Description</label>
            <input
              type="text"
              placeholder="Description here"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="form-checkbox">
            <label>Set reminder</label>
            <input
              className="checkbox"
              type="checkbox"
              title="Reminder"
              checked={reminder}
              value={reminder}
              onChange={(event) => setReminder(event.currentTarget.checked)}
            />
          </div>
          <input className="submit" type="button" value="Save task" onClick={submit}></input>
        </form>
      </div>
    </div>
  )
}

export default Siderbar