export function writeArticle(payload) {
    return {
        type: 'MDW_WRITE_ARTICLE',
        payload,
    }
}

export function getAllArticles() {
    return {
        type: 'MDW_GET_ALL_ARTICLES',
    }
}

export function getOneArticle(payload) {
    return {
        type: 'MDW_GET_ONE_ARTICLE',
        payload,
    }
}

export function deleteArticle(payload) {
    return {
        type: 'MDW_DELETE_ARTICLE',
        payload,
    }
}

export function editArticle(payload) {
    return {
        type: 'MDW_EDIT_ARTICLE',
        payload,
    }
}
