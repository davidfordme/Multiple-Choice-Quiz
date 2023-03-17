export type QuestionRow = {
    index : number,
    answer : string,
    selected : boolean,
    correct : null | true | false
}

export type Question = {
    type : string,
    answer : string,
    answers : string[]
} | null

export interface QuizFile {
    title : string;
    target : string;
    description : string;
    questions : Question[];
}

export interface QuizListItem {
    title : string;
    path : string;
}