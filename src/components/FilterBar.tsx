import axios from "axios";
import { useEffect, useState } from "react"
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useFilterStore } from "../stores/filterStore";

export const FilterBar = () => {
    
    const [tags, setTags] = useState([]);
    const [tagSearch, setTagSearch] = useState<string>("");

    const filter = useFilterStore((state) => state)
    const setSort = useFilterStore((state) => state.setSort)
    const addTag = useFilterStore((state) => state.addTag)
    const removeTag = useFilterStore((state) => state.removeTag)

    const onLoadPage = async () => {
        try{
            await axios.get(`${process.env.REACT_APP_API_PATH}/tags`)
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
        <div className="p-4 m-4 flex flex-col w-[224px] min-h-[400px] bg-white rounded-md">
                <div className="border-b-2 mb-4 border-primary max">
                    <p className="text-xs">Filter</p>
                </div>
            <select 
                name="modified" 
                id="modifiedFilter" 
                onChange={(e)=>setSort(e.target.value)}
                className="text-sm mb-4 ring-1 ring-background rounded-md p-1"
            >
                <option value={-1}>Sort by Recently Modified</option>
                <option value={1}>Sort by Last Modified </option>
            </select>

            <input
            className="text-sm ring-1 ring-background rounded-md p-1"
            placeholder="Tag filter"
                type="text"
                value={tagSearch}
                onChange={(e:any)=>setTagSearch(e.target.value)}
            />
            <ul className="list-none border-background mb-4 relative">
                {tagSearch.length>0 &&<div className="absolute z-50 bg-white w-full border-2">
            {
                 tags.filter((el:any)=>el.name.includes(tagSearch)).map((tag:any, index:number) =>{
                    return(
                        <li key={index} className="m-1 bg-background pr-1 pl-1">
                            <button 
                                className="hover:opacity-30 w-full text-left"
                                onClick={()=>{
                                    addTag(tag)
                                    setTagSearch("")
                                }}
                            >{tag.name}</button></li>
                    )
                })
            }
            </div>}
            </ul>
            <div className="flex flex-row flex-wrap">
                {filter.tags.map((tag:any, index:number)=>
                <div key={index} className="relative group p-1 pl-0">
                    <button
                    onClick={()=>removeTag(tag)}
                    className="absolute right-0 -top-0 text-xs hidden bg-white group-hover:block text-secondary"
                    >
                        <XCircleIcon className="h-3 w-3 text-primary"/>
                    </button>
                    <div className="rounded-md border-2 border-primary p-1 text-xs text-primary">{tag.name}</div>
                </div>
                )}
            </div>
        </div>
    )
}