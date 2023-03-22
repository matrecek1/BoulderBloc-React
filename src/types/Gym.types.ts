export interface IRating {
    averageRating: "Not Rated" | number
    ratings: number[]
}

export interface IGym {
    name: string;
    description: string;
    _id:string;
    walls?:IWall[]
    rating: IRating
}

export interface IWall {
    name:string;
    description: string;
    _id:string;
    angle: number;
    rating:IRating
    boulders?:IBoulder[]
}

export type Grade = "5" | "5A" | "5A+" | "5B" | '5B+' | "5C" | "5C+" | "6A" |
    "6A+" | "6B" | '6B+' | "6C" | "6C+" | "7A" | "7A+" | "7B" | '7B+' | "7C" | "7C+" |
    "8A" | "8A+" | "8B" | '8B+' | "8C" | "8C+"

interface Gradeable {
    grade:{
        activeGrade:Grade;
        proposeGrades:Grade[]
    }
}

export interface IBoulder {
    name:string;
    description:string;
    _id:string;
    grade:Gradeable;
    rating:IRating;
    imgName:string;
    imgUrl:string;
}

