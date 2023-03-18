interface Page {
    key : string
    title : string
    url : string
}

export function fetchUrlForKey(key : string) {
    const page = fetchPageForKey(key)
    if (page) return page.url
    else return "/"
}

export const pageTree : Page[] = [
    {
        key : "home",
        title : "Home",
        url : "/"
    },
    {
        key : 'all',
        title : "Pre Made Quizzes",
        url : "/pre-made-quizzes"
    },
    {
        key : 'mine',
        title: "My Quizzes",
        url : "/my-quizzes"
    },
    {
        key : 'create',
        title : "Create Quiz",
        url : "/create-quiz"
    }
]

export function fetchPageForKey(inputKey : string) : Page | null {

    let selectedPage = null

    pageTree.every(page => {
        if(page.key === inputKey) {
            selectedPage = page
            return false
        }

        return true
    })

    return selectedPage
}