import PageHeader from '../components/PageHeader';
import HomePageHeader from "../assets/HomePage Header.png";
import TaskStatus from '../components/TaskStatus';

function HomePage({taskCategories}){
    return(
        <>
        <PageHeader pageName="Home" pageImage={HomePageHeader} />

        <TaskStatus taskCategories={taskCategories} />
        </>
    )
}

export default HomePage;