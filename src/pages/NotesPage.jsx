import "./NotesPage.css";
import PageHeader from '../components/PageHeader';
import NoteCategories from "../components/Notes/NoteCategories/NoteCategories";
import NoteList from "../components/Notes/NoteList"
import NotesHeader from "../assets/Notes Header.png";

function NotesPage({noteCategories, setNoteCategories}){
    return(
        <div className="note-page">

        <PageHeader pageName="Notes" pageImage={NotesHeader} />

        
      {/* Category section */}
        <NoteCategories
            noteCategories={noteCategories}
            setNoteCategories={setNoteCategories}
        />

        <NoteList noteCategories={noteCategories} />
    
        </div>
    )
}

export default NotesPage;