import { browser } from '$app/environment'
import type { QuizFile } from '$lib/types/types'

export function fetchFromStorage(key : string) : any | null {
    return (browser) ? localStorage.getItem(key) : null
}

export function writeToStorage(key : string, content: any) {
    if(browser) localStorage[key] = JSON.stringify(content)
}

export function deleteFromStorage(key : string) {
    if(browser) localStorage.removeItem(key)
}

export function fetchAllQuizzesFromStorage() : QuizFile[] {
    let quizzes : QuizFile[] = []
    if(browser) {
        Object.keys(localStorage).map(key => {
            if(key.includes('quiz-')) {
                const quizString = localStorage.getItem(key)
                if(quizString) quizzes.push(JSON.parse(quizString) as QuizFile)
            }
        })
    }
    return quizzes
}

export function fetchQuizFromStorage(key : string | null) : QuizFile | null {
    if(key && browser) {
        const quizString = fetchFromStorage(key)
        if (quizString) return JSON.parse(quizString) as QuizFile
        else return null
    } else return null
}