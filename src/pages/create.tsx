import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react"
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

  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

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

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const temp = {...saying};
    let emptyTag = temp.tags.findIndex(el=>el ==="");
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
    
  useEffect(()=>{
    onLoadPage()
  },[])

  useEffect(()=>console.log(saying), [saying])
    return (
        <form onSubmit={onSubmit} className="pt-[56px] w-screen h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl">Add New Saying</h1>
            <div className="w-[400px] min-h-[490px]">
                <div className="mb-8">
                    <label htmlFor="saying" className="block text-sm font-medium leading-6 text-secondary">
                        Saying
                    </label>
                    <div className="mt-2">
                        <textarea
                          onChange={(e)=> setSaying({...saying, saying:e.target.value})}
                            id="saying"
                            name="saying"
                            required
                            className="block w-full rounded-md border-0 p-1.5 text-secondary shadow-sm ring-1 ring-background placeholder:text-background sm:text-sm sm:leading-6"
                        />
                    </div>
                </div> 
                <div className="mb-8 flex flex-col w-full">
                    <label htmlFor="tags" className="block text-sm font-medium leading-6 text-secondary">
                        Tags
                    </label>
                    {
                        saying.tags.map((tag,i)=><div className="flex flex-row justify-start items-center w-full">
                        <select className="pt-1 pb-1 mt-1 mb-1 rounded-md w-full"  value={tag} onChange={(e)=> setTag(e.target.value,i)}>
                            {tags.map((opt:any)=><option value={opt._id}> {opt.name} </option>)}
                        </select>
                        {i>=1?<button onClick={()=>removeTag(i)} className="bg-primary ml-4 rounded-md h-6 w-6 hover:opacity-50"><MinusIcon className="h-6 w-6 text-white"/></button>:null}
                        </div>
                        )
                    }
                    {(saying.tags.length<5 && saying.tags.find(el=>el==="")===undefined)?
                    <button onClick={()=> 
                    {
                        if(saying.tags.length<5)
                    {
                        const temp:any = [...saying.tags];
                        temp.push("");
                        setSaying({...saying, tags:temp})
                    }}} className="bg-primary rounded-md mt-1 h-6 w-6 hover:opacity-50"><PlusIcon  className="h-6 w-6 text-white mr-8 text-primary" /></button>:null}
                </div> 

                <div className="mb-8 w-full">
                    <label htmlFor="isVisible" className="block text-sm font-medium leading-6 text-secondary">
                        Visible
                    </label>
                    <div className="w-full">
                    <select id="isVisible" className="pt-1 pb-1 mt-1 mb-1 mr-4 rounded-md w-full"  value={saying.isVisible as unknown as number} onChange={(e)=>setSaying({...saying, isVisible:Number(e.target.value)})}>
                      <option value={1}>true</option>
                      <option value={0}>false</option>
                  </select>
                    </div>
                </div> 

                <button type="submit" className="w-full rounded-md bg-primary p-1 text-white hover:opacity-50">Create</button>
            </div>
        </form>
    ) 
}

const Tag = () => {

}