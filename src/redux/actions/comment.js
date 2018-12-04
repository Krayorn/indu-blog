export function writeComment(payload) {
    return {
        type: 'MDW_WRITE_COMMENT',
        payload,
    }
}

export function deleteComment(payload) {
    return {
        type: 'MDW_DELETE_COMMENT',
        payload,
    }
}
