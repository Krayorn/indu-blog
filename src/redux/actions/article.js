export function writeArticle(payload) {
    return {
        type: 'MDW_WRITE_ARTICLE',
        payload,
    }
}

export function getAllArticles() {
    return {
        type: 'MDW_GET_ALL_ARTICLES'
    }
}

export function getOneArticle(payload) {
    return {
        type: 'MDW_GET_ONE_ARTICLE',
        payload,
    }
}
