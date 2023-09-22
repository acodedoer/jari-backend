import axios from "axios";
import { Saying } from "../components/Saying";
import { useEffect, useState } from "react"
import { FilterBar } from "../components/FilterBar";
import { SayingType, TagType } from "../types";
import { useFilterStore } from "../stores/filterStore";


export const Home = () => {
    const [sayings, setSayings] = useState<SayingType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const filter = useFilterStore((state) => state)
    const addTag = useFilterStore((state) => state.addTag)

    const fetchSayings = async () => {
        let tag = "";
        if(filter.tags.length<=0) tag = "0";
        else filter.tags.forEach((el:TagType)=> {tag+=`${el._id},`})
        try {
            setIsLoading(true)
            await axios.get(`http://localhost:8080/sayings/${tag}/${filter.sort}`)
            .then((response)=>{
                setSayings(response.data); 
                setIsLoading(false);
            })
        } catch (error:any) {
            setIsLoading(false)
            alert(error.message);
            console.log(error)
        }
    };


    useEffect(() => {
        fetchSayings();
    },[filter])

    return(
        <div className="pt-[56px] w-full flex flex-row justify-center relative">
            <>
                <div className="absolute left-0">
                    <FilterBar/>
                </div>
                <div>
                    {sayings.map((el:SayingType, i:number)=>
                        <Saying
                        key={i}  
                        fetchSayingByTag={(tag:TagType)=>addTag(tag)} 
                        index={i} 
                        data={el}
                        onEdit = {(data:any)=>{const temp = [...sayings]; temp[i]=data; setSayings(temp) }} 
                        onDelete={()=>null}
                        />)
                    }
                </div>
            </>
            
            {!isLoading?null:<p>Loading...</p>}
        </div>
    )
}