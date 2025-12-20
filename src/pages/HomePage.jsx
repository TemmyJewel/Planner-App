import PageHeader from '../components/PageHeader';
import HomePageHeader from "../assets/HomePage Header.png";

function HomePage(){
    return(
        <>
        <PageHeader pageName="Home" pageImage={HomePageHeader} />
        </>
    )
}

export default HomePage;