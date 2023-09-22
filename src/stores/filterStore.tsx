import { create } from 'zustand'
import { TagType } from '../types'

interface FilterState {
    tags: TagType[],
    sort:number,
    setSort: Function,
    addTag:Function,
    removeTag: Function
}

const addUniqueTag = (tag:TagType, tags:TagType[]) => {
    if(tags.findIndex(el => el._id === tag._id) === -1)
    {
        tags.push(tag)
    }
    return tags;
}

const removeTag = (tag:TagType, tags:TagType[]) => {
    try {
        tags.splice(tags.findIndex((el)=>el._id === tag._id),1);
    } catch ( error ) {
        console.log("Error removing tag from filter list", error)
    }
    return tags;
}

export const useFilterStore = create<FilterState>((set) => ({
    tags: [],
    sort:-1,
    setSort: (sort:number) => set(() => ({ sort })),
    addTag: (tag: TagType) => set((state) => ({tags: addUniqueTag(tag, state.tags)})),
    removeTag: (tag: TagType) => set((state) => ({tags: removeTag(tag, state.tags)}))
}))