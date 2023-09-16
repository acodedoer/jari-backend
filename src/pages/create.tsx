import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react"
import { SayingForm } from "../components/SayingForm";
import { useNavigate } from "react-router-dom";

export const Create = () => {

  const [saying, setSaying] = useState({
      saying:"",
      tags:[],
      isVisible: 0,
      author:localStorage.getItem("jariUserID"),
      editors:[localStorage.getItem("jariUserID")],
      lastEditor:localStorage.getItem("jariUserID")
  })

  const navigate = useNavigate();

  const onSubmit = async (data:any) => {
    const temp = {...data};
    let emptyTag = temp.tags.findIndex((el:any)=>el ==="");
    if(emptyTag !== -1)temp.tags.splice(emptyTag,1);
    if(temp.tags.length>0){
      try {
        await axios.post("http://localhost:8080/sayings", temp)
        .then((response)=>{
          console.log(response)
          response.status === 200? alert("Saying created"!):alert("Error!");
        })
        .then(()=> navigate("/"))
      }catch (error) {
        alert(error)
      }
    }
    else{
      alert("You must add at least one tag")
    }
  }

  const handleChange = (event: any) => {
    const {id, value} = event.target;
    setSaying({...saying, [id]:value});
  }
    

    return (
        <div className="pt-[56px] w-screen h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl">Add New Saying</h1>
            <SayingForm onSubmitCallback={onSubmit} data={saying}/>
          
        </div>
        
    ) 
}

const Tag = () => {

}