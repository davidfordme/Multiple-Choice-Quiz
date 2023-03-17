import type { QuizFile } from '$lib/types/types';

export function *Shuffle(arr : string[]) {
    arr = [...arr];
    while(arr.length) yield arr.splice(Math.random()*arr.length|0, 1)[0]
}