import { create } from 'zustand'
import { Tag } from '../types'

const addUniqueTag = (tag:Tag, tags:Tag[]) => {
    if(tags.findIndex(el => el._id === tag._id) != -1)
    {
        tags.push(tag)
    }
    return tags;
}

const removeTag = (tag:Tag, tags:Tag[]) => {
    try {
        tags.splice(tags.findIndex((el)=>el._id === tag._id),1);
    } catch (error) {
        console.log("Error removing tag from filter list",error)
    }
    return tags;
}

export const filterStore = create((set) => ({
  tag: [],
  sort:-1,
  setSort: (sort:number) => set(() => ({ sort })),
  addTag: (tag:Tag) => set((state:any) => ({tags: addUniqueTag(tag, state.tags)})),
  removeTag: (tag: Tag) => set((state:any) => ({tags: removeTag(tag, state.tags)}))
}))