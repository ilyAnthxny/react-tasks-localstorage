
import { useState, useEffect } from 'react';
import './App.css';
import { Container } from './components/Container';
import {TaskCreator} from "./components/TaskCreator"
import { TaskTable } from './components/TaskTable';
import { VisibilityControl } from './components/VisibilityControl';

function App() {

  const [tasksItems, setTasksItems] = useState([])
  const [showCompleted, setShowCompleted] = useState(false)

  function createNewTask(taskName){

    if(!tasksItems.find(task => task.name === taskName)){
      setTasksItems([...tasksItems, {name: taskName, done: false}])
    }
  }

  const toggleTask = (task) => {
    setTasksItems(
      tasksItems.map((t) => (t.name === task.name ? {...t, done: !t.done} : t))
    )
  }



  useEffect( () =>{
    let data = localStorage.getItem("tasks")
    if ( data ){
      setTasksItems(JSON.parse(data))
    }
  }, [])


  const cleanTasks = () =>{
    setTasksItems(tasksItems.filter(task => !task.done))
    setShowCompleted(false)
  }


  useEffect( () =>{
    localStorage.setItem("tasks", JSON.stringify(tasksItems))
  }, [tasksItems])

  return (

    <main className="bg-dark vh-100 text-white">

     <Container>
      <div className='container p-4 col-md-4 offset-md-4'>
            <TaskCreator createNewTask={createNewTask} />

            <TaskTable tasks={tasksItems} toggleTask={toggleTask}/>

            <VisibilityControl
              isChecked={showCompleted}
              showCompleted={ (checked) => setShowCompleted(checked)}
              cleanTasks={cleanTasks}
              />

            {
              showCompleted === true && (
                <TaskTable tasks={tasksItems} toggleTask={toggleTask} showCompleted={false}/>
              )
            }
        </div>
     </Container>

    </main>
  );
}

export default App;

