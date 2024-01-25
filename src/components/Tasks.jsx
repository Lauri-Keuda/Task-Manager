import Task from "./Task"

const Tasks = ({ tasks, onDoubleClick, onDelete }) => {
  return (
    <>
      {tasks.map((task) => {
        return <Task
          key={task.id}
          task={task}
          onDoubleClick={onDoubleClick}
          onDelete={onDelete}
        />
      })}
    </>
  )
}

export default Tasks