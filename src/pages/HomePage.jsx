import PageHeader from "../components/PageHeader";
import HomePageHeader from "../assets/HomePage Header.png";
import TaskStatus from "../components/Tasks/TaskStatus";
import NoteList from "../components/Notes/NoteList";
import HomeQuote from "../components/HomeQuote";    
import "./HomePage.css";





function HomePage({ taskCategories, noteCategories }) {
  return (
    <div className="home-page">
      <PageHeader pageName="Home" pageImage={HomePageHeader} />
      <HomeQuote />
      <NoteList noteCategories = {noteCategories}/>

      <TaskStatus taskCategories={taskCategories} />
    </div>
  );
}

export default HomePage;
