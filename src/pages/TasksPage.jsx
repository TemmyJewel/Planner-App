// ================================================
// TASKS PAGE
// ================================================
import "./TasksPage.css";
import PageHeader from "../components/PageHeader";
import TaskCategories from "../components/Tasks/TaskCategories/TaskCategories";
import TaskStatus from "../components/Tasks/TaskStatus";
import TaskHeader from "../assets/Task Header.png";

// ================================================
//  MAIN COMPONENT: TasksPage
// ================================================
function TasksPage({ taskCategories, setTaskCategories }) {
  return (
    <div className="task-page">
      <PageHeader pageName="Your Tasks" pageImage={TaskHeader} />

      {/* Category section */}
      <TaskCategories
        taskCategories={taskCategories}
        setTaskCategories={setTaskCategories}
      />

      <TaskStatus taskCategories={taskCategories} />
    </div>
  );
}

export default TasksPage;
