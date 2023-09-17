import axios from "axios";
import mongoose from "mongoose";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { SayingForm } from "../components/SayingForm";
import { isEditable } from "@testing-library/user-event/dist/utils";

type Saying = {
    saying: String
    tags: [],
    created: Date,
    edited: Date,
    likes: Number,
    isVisible: Boolean,
    author: mongoose.Schema.Types.ObjectId,
    editors: mongoose.Schema.Types.ObjectId[],
    lastEditor: mongoose.Schema.Types.ObjectId
}

export const Home = () => {
    const [sayings, setSayings] = useState<Saying[]>([]);
    const [refresh, setRefresh] = useState(true);

    const fetchSayingByTag = async (tag:string) => {
        try {
            await axios.get(`http://localhost:8080/sayings/${tag}`)
            .then((response)=>{
                setSayings(response.data); 
            })
        } catch (error) {
            alert(error);
        }
    };

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
            {sayings.map((el:Saying, i:number)=><Saying  fetchSayingByTag={fetchSayingByTag} index={i} data={el} onEdit = {(data:any)=>{const temp = [...sayings]; temp[i]=data; setSayings(temp) }} onDelete={()=>setRefresh(true)}/>)}
        </div>
    )
}

const Saying = ({data, onDelete, onEdit, fetchSayingByTag}: any) => {
    
    const onSubmit = async (data:any) => {
        const temp = {...data};
        const userID = localStorage.getItem("jariUserID");
        if(data.editors.find((el:any)=>el===localStorage.getItem("jariUserID"))===undefined){
            temp.editors.push(userID);
        }
        temp.lastEditor = userID;
        temp.edited = Date.now();
        let emptyTag = temp.tags.findIndex((el:any)=>el ==="");
        if(emptyTag !== -1)temp.tags.splice(emptyTag,1);
        if(temp.tags.length>0){
          try {
            await axios.put(`http://localhost:8080/sayings/${data._id}`, {"saying":temp})
            .then((response)=>{
                onEdit(temp)
              response.status === 200? alert("Saying updated"!):alert("Error!");
            })
          }catch (error) {
            alert(error)
          }
        }
        else{
          alert("You must add at least one tag")
        }
      }

    
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const deleteSaying = async (id:string) => {
        await axios.delete(`http://localhost:8080/sayings/${id}`)
        .then(()=>{
            setIsDeleting(true);
            setTimeout(()=>{onDelete()},400)
        });
    }

    useEffect(()=>{
        setIsDeleting(false);
    },[data])

    return(
        <div onMouseLeave={()=>setIsEditing(false)} className={`${isDeleting?"animate-remove":""} flex flex-row justify-center group max-w-[600px]`}>
            <div className={`rounded-md relative p-4 m-4 min-w-[500px] max-w-[500px] shadow-sm bg-white`}>
                <div className="flex flex-row mb-2 justify-between border-b-2 border-primary max">
                    <p className="text-xs">Created:{new Date(data.created).toLocaleDateString()}</p>
                    <p className="text-xs">Last Edited:{new Date(data.created).toLocaleDateString()}</p>
                </div>
            {!isEditing?<>
                <p className="mb-1">{data.saying}</p>
                {data.tagDetails.map((el:any)=><Tag data={el} fetchSayingByTag={fetchSayingByTag}/>)}
                </>:
                <>
                    <p className="mb-8"></p>
                    <SayingForm action={"Update"} onSubmitCallback={onSubmit} data={data}/>
                </>
            }
            </div>
            {!isEditing?
            <div className="hidden group-hover:flex flex-col justify-between mt-6 mb-6">
                <button onClick={()=>setIsEditing(true)} className="hover:opacity-50"><PencilSquareIcon className="h-5 w-5 text-primary"/></button>
                <button onClick={()=>deleteSaying(data._id)} className="hover:opacity-50"><TrashIcon className="h-5 w-5 text-primary"/></button>   
            </div>:null}
        </div>
    )
}

const Tag = ({data, fetchSayingByTag}:any) => { 
    return(
        <button onClick={()=>fetchSayingByTag(data._id)} className="rounded-md text-xs text-white bg-primary p-1 mr-1 hover:opacity-50">
            {data.name}
        </button>
    )
}