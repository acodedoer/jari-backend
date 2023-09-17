import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SayingForm = ({onSubmitCallback, data, action="Create"}:any) => {
    const [saying, setSaying] = useState(data)
    const [tags, setTags] = useState([]);

    const navigate = useNavigate();
  
    const onSubmit = (event:any) =>{
        event.preventDefault();
        onSubmitCallback(saying)
    }

    const setTag=(tag:any,i:number)=>{
      if(i<5){
        const temp:any = [...saying.tags];
        temp[i] = tag;
        setSaying({...saying, tags:temp})
      }
    }
    
    const removeTag = (i:any) => {
      const temp = [...saying.tags];
      temp.splice(i,1);
      setSaying({...saying, tags:temp})
    }

    const onLoadPage = async () => {
        try{
            await axios.get("http://localhost:8080/tags")
            .then(({data})=> {
              const temp:any = [...data];
              temp.unshift({_id:"", name:""});
              setTags(temp);
            });
            
        }
        catch (error) {
            alert(error)
        }
      }

      useEffect(()=>{
        onLoadPage()
      },[])

    return(
        <form onSubmit={onSubmit} className="w-full">
        <div className="mb-8">
            <label htmlFor="saying" className="block text-sm font-medium leading-6 text-secondary border-b-2 border-primary">
                Saying
            </label>
            <div className="mt-2">
                <textarea
                value={saying.saying}
                  onChange={(e)=> setSaying({...saying, saying:e.target.value})}
                    id="saying"
                    name="saying"
                    required
                    className=" border-background block w-full rounded-md  p-1.5 text-secondary shadow-sm ring-1 ring-background placeholder:text-background sm:text-sm sm:leading-6"
                />
            </div>
        </div> 
        <div className="mb-8 flex flex-col w-full">
            <label htmlFor="tags" className="block text-sm font-medium leading-6 text-secondary border-b-2 border-primary">
                Tags
            </label>
            {
                saying.tags.map((tag:any,i:number)=><div className="flex flex-row justify-start items-center w-full">
                <select className="pt-1 pb-1 mt-1 mb-1 rounded-md w-full shadow-sm ring-1  ring-background"  value={tag} onChange={(e)=> setTag(e.target.value,i)}>
                    {tags.map((opt:any)=><option value={opt._id}> {opt.name} </option>)}
                </select>
                {i>=1?<button type="button" onClick={()=>removeTag(i)} className="bg-primary ml-4 rounded-md h-6 w-6 hover:opacity-50"><MinusIcon className="h-6 w-6 text-white"/></button>:null}
                </div>
                )
            }
            {(saying.tags.length<5 && saying.tags.find((el:any)=>el==="")===undefined)?
            <button type="button" onClick={()=> 
            {
                if(saying.tags.length<5)
                {
                    const temp:any = [...saying.tags];
                    temp.push("");
                    setSaying({...saying, tags:temp})
                }
            }} className="bg-primary rounded-md mt-1 h-6 w-6 hover:opacity-50"><PlusIcon  className="h-6 w-6 text-white mr-8 " /></button>:null}
        </div> 

        <div className="mb-8 w-full">
            <label htmlFor="isVisible" className="block text-sm font-medium leading-6 text-secondary border-b-2 border-primary">
                Visible
            </label>
            <div className="w-full">
            <select id="isVisible" className="pt-1 pb-1 mt-1 mb-1 mr-4 rounded-md w-full shadow-sm ring-1  ring-background"  value={saying.isVisible as unknown as number} onChange={(e)=>setSaying({...saying, isVisible:Number(e.target.value)})}>
              <option value={1}>true</option>
              <option value={0}>false</option>
          </select>
            </div>
        </div> 

        <button type="submit" className="w-full rounded-md bg-primary p-1 text-white hover:opacity-50">{action}</button>
    </form>
    )
}