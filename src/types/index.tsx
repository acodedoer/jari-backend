import mongoose from "mongoose"

export type TagType = {
    name: string,
    _id: string
}

export type SayingType = {
    saying: String
    tags: [],
    created: Date,
    edited: Date,
    likes: Number,
    isVisible: Boolean,
    author: mongoose.Schema.Types.ObjectId,
    editors: mongoose.Schema.Types.ObjectId[],
    lastEditor: mongoose.Schema.Types.ObjectId
}