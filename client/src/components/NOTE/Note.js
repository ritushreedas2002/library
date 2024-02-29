import { useState } from "react";
import Notetaking from "./Notetaking";

const Note=()=>{
    const [showForm, setShowForm] = useState(false);

    const handleshow=()=>{
        setShowForm(true);
    }
    const handlenotshow=()=>{
        setShowForm(false);
    }

    const uid=localStorage.getItem("uid");

    return (
        <>
            <Notetaking userid={uid} show={handleshow} notshow={handlenotshow} showForm={showForm}/>
        </>
    )
}
export default Note;