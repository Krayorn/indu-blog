const notification = (state = { achievement: { title: 'test' } }, action) => {

  switch (action.type) {
    case 'CLEAN_ACHIEVEMENT':
      return Object.assign({}, state, {
        achievement: false,
      })

    case 'REGISTER_OK':
      return Object.assign({}, state, {
        achievement: action.payload.response.data.gamer.unlockedAchievement || false,
      })

    case 'WRITE_COMMENT_OK':
    case 'WRITE_ARTICLE_OK':
      return Object.assign({}, state, {
        achievement: action.payload.response.data.gamerInfo.unlockedAchievement || false,
      })


      default:
        return state
  }
}

export default notification
