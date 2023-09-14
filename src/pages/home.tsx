import axios from "axios";
import mongoose from "mongoose";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

type Saying = {
    saying: String
    tags: String,
    created: Date,
    edited: Date,
    likes: Number,
    isVisible: Boolean,
    author: mongoose.Schema.Types.ObjectId,
    editors: mongoose.Schema.Types.ObjectId[],
    lastEditor: mongoose.Schema.Types.ObjectId
}

export const Home = () => {
    const [sayings, setSayings] = useState([]);

    useEffect(() => {
        const fetchSayings = async () => {
            try {
                await axios.get("http://localhost:8080/sayings")
                .then((response)=>{
                    console.log(sayings)
                    setSayings(response.data); 
                })
            } catch (error) {
                alert(error);
            }
        };

        fetchSayings();
    })

    return(
        <div>
            {sayings.map((el:Saying)=><p>{el.saying}</p>)}
        </div>
    )
}