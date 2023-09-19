import axios from "axios";
import { useEffect, useState } from "react"

export const FilterBar = ({filterCallback, selectedTags=[]}: any) => {
    
    const [tags, setTags] = useState([]);
    const [tagSearch, setTagSearch] = useState<string>("");

    const [options, setOptions] = useState({    
        modified: -1,
        tags: selectedTags
    })

    // useEffect(()=>{
    //     if(selectedTags.lenght != options.tags.length){
    //         setOptions({...options,tags:selectedTags})
    //     }
    // }, [selectedTags])

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

      const handleChange = (e:any) => {
        setOptions({...options, [e.target.name]:e.target.value})
      }

      useEffect(()=>{
        onLoadPage()
      },[])

      useEffect(()=>{
        console.log(options.tags)
        filterCallback(options);
      },[options])

    return(
        <div className="p-4 m-4 flex flex-col w-[200px] min-h-[400px] bg-white rounded-md">
                <div className="border-b-2 mb-4 border-primary max">
                    <p className="text-xs">Filter</p>
                </div>
            <select 
                name="modified" 
                id="modifiedFilter" 
                onChange={handleChange}
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
                 tags.filter((el:any)=>el.name.includes(tagSearch)).map((tag:any) =>{
                    return(
                        <li className="m-1 bg-background pr-1 pl-1">
                            <button 
                                className="hover:opacity-30 w-full text-left"
                                onClick={()=>{
                                    setOptions({...options, tags:[...options.tags,tag]});
                                    setTagSearch("")
                                }}
                            >{tag.name}</button></li>
                    )
                })
            }
            </div>}
            </ul>
            <div className="flex flex-row flex-wrap">
                {options.tags.map((tag:any)=>
                <div className="relative group p-1 pl-0">
                    <button
                    onClick={()=>setOptions({...options, tags:options.tags.filter((el:any)=>el._id!=tag._id)})}
                    className="absolute -right-0 -top-1 text-xs border-primary hidden group-hover:block text-secondary"
                    >
                        &#215;
                    </button>
                    <div className="rounded-md bg-primary p-1 text-xs text-white">{tag.name}</div>
                </div>
                )}
            </div>
            {/* <select
                value={options.tag}
                name="tag" 
                id="tagFilter" 
                onChange={handleChange}>
                {
                    tags.map((opt:any) => (
                        <option value={opt._id} >         
                            {opt.name} 
                        </option>
                    ))
                }
            </select> */}
        </div>
    )
}