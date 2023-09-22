import { useFilterStore } from "../stores/filterStore"
import { TagType } from "../types"

export const Tag = ({tag}:{tag:TagType}) => { 
    const addTag = useFilterStore((state) => state.addTag)
    return(
        <button 
            onClick={()=>addTag(tag)} 
            className="rounded-md text-xs text-white bg-primary p-1 mr-1 hover:opacity-50"
        >
            {tag.name}
        </button>
    )
}