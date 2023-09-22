import axios from "axios";
import mongoose from "mongoose";
import { useEffect, useState } from "react"
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { SayingForm } from "../components/SayingForm";
import { FilterBar } from "../components/FilterBar";
import { useCookies } from "react-cookie";

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

interface filter{
    modified: number,
    tags:any[]
}
export const Home = () => {
    const [sayings, setSayings] = useState<Saying[]>([]);
    const [refresh, setRefresh] = useState(true);
    const [cookies] = useCookies(["access_token"]);
    const [filter, setFilter] = useState<filter>({
        modified: -1,
        tags:[]
    })

    const fetchSayings = async () => {
        let tag = "";
        filter.tags.forEach((el)=> {tag+=`${el._id},`})
        console.log(tag)
        try {
            await axios.get(`http://localhost:8080/sayings/${tag}/${filter.modified}`)
            .then((response)=>{
                setSayings(response.data); 
            })
        } catch (error:any) {
            alert(error.message);
        }
    };

    useEffect(() => {
        if(refresh){
            fetchSayings();
            setRefresh(false);
        }
    },[refresh, filter])

    useEffect(() => {
        fetchSayings();
    },[filter])

    return(
        <div className="pt-[56px] w-full flex flex-row justify-center relative">
            <div className="absolute left-0">
                <FilterBar filterCallback={setFilter} selectedTags={filter.tags}/>
            </div>
            <div>
                {sayings.map((el:Saying, i:number)=>
                    <Saying  
                        fetchSayingByTag={(tag:any)=>setFilter({...filter, tags:[...filter.tags,tag]})} 
                        index={i} 
                        data={el}
                        onEdit = {(data:any)=>{const temp = [...sayings]; temp[i]=data; setSayings(temp) }} onDelete={()=>setRefresh(true)}
                    />)
                }
            </div>
        </div>
    )
}

const Saying = ({data, onDelete, onEdit, fetchSayingByTag}: any) => {
    const [cookies] = useCookies(["access_token"]);
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
            const config = {
                headers:{
                  "Authorization": `Bearer ${cookies.access_token}`
                }
              };
            await axios.put(`http://localhost:8080/sayings/${data._id}`, {"saying":temp},config)
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
        try {
            const config = {
                headers:{
                  "Authorization": `Bearer ${cookies.access_token}`
                }
              };
            await axios.delete(`http://localhost:8080/sayings/${id}`, config)
            .then(()=>{
                setIsDeleting(true);
                setTimeout(()=>{onDelete()},400)
            });
        } catch (error) {
            alert(error)
        }
    }

    useEffect(()=>{
        setIsDeleting(false);
    },[data])

    return(
        <div onMouseLeave={()=>setIsEditing(false)} className={`${isDeleting?"animate-remove":""} flex flex-row justify-center group max-w-[600px]`}>
            <div className={`rounded-md relative p-4 m-4 min-w-[500px] max-w-[500px] shadow-sm bg-white`}>
                <div className="flex flex-row mb-2 justify-start border-b-2 border-primary max">
                    <p className="text-xs">Modified:{new Date(data.created).toLocaleString()}</p>
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
            {!isEditing && cookies.access_token?
            <div className={`hidden group-hover:flex flex-col justify-between mt-6 mb-6`}>
                <button onClick={()=>setIsEditing(true)} className="hover:opacity-50"><PencilSquareIcon className="h-5 w-5 text-primary"/></button>
                <button onClick={()=>deleteSaying(data._id)} className="hover:opacity-50"><TrashIcon className="h-5 w-5 text-primary"/></button>   
            </div>:null}
        </div>
    )
}

const Tag = ({data, fetchSayingByTag}:any) => { 
    return(
        <button onClick={()=>fetchSayingByTag(data)} className="rounded-md text-xs text-white bg-primary p-1 mr-1 hover:opacity-50">
            {data.name}
        </button>
    )
}