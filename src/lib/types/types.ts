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
    questions : Question[];
}