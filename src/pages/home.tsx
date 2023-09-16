import axios from "axios";
import mongoose from "mongoose";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

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
    const [refresh, setRefresh] = useState(true);


    useEffect(() => {
        const fetchSayings = async () => {
            try {
                await axios.get("http://localhost:8080/sayings")
                .then((response)=>{
                    console.log(response.data)
                    setSayings(response.data); 
                })
            } catch (error) {
                alert(error);
            }
        };

        if(refresh){
            fetchSayings();
            setRefresh(false);
        }
    },[refresh])

    return(
        <div className="pt-[56px] w-full flex flex-col items-center">
            {sayings.map((el:Saying)=><Saying data={el} onDelete={()=>setRefresh(true)}/>)}
        </div>
    )
}

const Saying = ({data, onDelete}: any) => {
    const deleteSaying = async (id:string) => {
        await axios.delete(`http://localhost:8080/sayings/${id}`)
        .then(()=>onDelete());
    }
    return(
        <div className="flex flex-row justify-center group w-600">
            <div className="rounded-md relative p-4 m-4 min-w-[500px] shadow-sm bg-white">
                <div className="flex flex-row mb-2 justify-between border-b-2 border-primary">
                    <p className="text-xs">Created:{new Date(data.created).toLocaleDateString()}</p>
                    <p className="text-xs">Last Edited:{new Date(data.created).toLocaleDateString()}</p>
                </div>
                <p className="mb-1">{data.saying}</p>
                {data.tags.map((el:any)=><Tag data={el}/>)}
            </div>
            <div className="hidden group-hover:flex flex-col justify-between mt-6 mb-6">
                <button className="hover:opacity-50"><PencilSquareIcon className="h-5 w-5 text-primary"/></button>
                <button onClick={()=>deleteSaying(data._id)} className="hover:opacity-50"><TrashIcon className="h-5 w-5 text-primary"/></button>   
            </div>
        </div>
    )
}

const Tag = ({data}:any) => {
    return(
        <button className="rounded-md text-xs text-white bg-primary p-1 mr-1 hover:opacity-50">
            {data}
        </button>
    )
}