import { SlClose } from "react-icons/sl"

const Task = ({ task, onDoubleClick, onDelete }) => {
  return (
    <div className={`task-container${task.reminder ? " reminder" : ""}`} onDoubleClick={() => onDoubleClick(task.id)} >
      <h3>{task.name} <SlClose onClick={() => onDelete(task.id)} style={{color: "white", cursor: "pointer", height: "25px", width: "25px" }}/></h3>
      <p>{task.description}</p>
    </div>
  )
}

export default Task