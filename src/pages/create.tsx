import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const Create = () => {

    const [saying, setSaying] = useState({
        saying:"",
        tags:"",
        isVisible: false,
        author:localStorage.getItem("jariUserID"),
        editors:[localStorage.getItem("jariUserID")],
        lastEditor:localStorage.getItem("jariUserID")
    })

    const navigate = useNavigate();
    const onSubmit = async (event: any) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/sayings", saying)
            .then((response)=>{
                console.log(response)
                response.status === 200? alert("Saying created"!):alert("Error!");
            })
            .then(()=> navigate("/"))

        } catch (error) {
            alert(error)
        }
    }

    const handleChange = (event: any) => {
        const {id, value} = event.target;
        setSaying({...saying, [id]:value});

    }

    return (
        <div className="pt-[56px]">
            <h2>Create Saying</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="saying">Saying</label>
                <input type="text" id="saying" onChange={handleChange}/>

                <label htmlFor="tags">Tags</label>
                <input type="text" id="tags" onChange={handleChange}/>

                <label htmlFor="isVisible">Visible</label>
                <select id="isVisible" onChange={handleChange}>
                    <option value="true">true</option>
                    <option value="false">false</option>
                </select>
                <button type="submit">Create</button>
            </form>
        </div>
    ) 
}