export const Tag = ({data, fetchSayingByTag}:any) => { 
    return(
        <button 
            onClick={()=>fetchSayingByTag(data)} 
            className="rounded-md text-xs text-white bg-primary p-1 mr-1 hover:opacity-50"
        >
            {data.name}
        </button>
    )
}