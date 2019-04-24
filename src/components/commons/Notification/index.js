import React, { Component } from 'react'

// Redux
import { connect } from 'react-redux'
import { cleanAchievement } from '../../../redux/actions/notification'

class Notification extends Component {
    componentDidMount() {
      const { cleanAchievement } = this.props

      setTimeout(cleanAchievement, 5000)
    }

    componentDidUpdate() {
      const { cleanAchievement } = this.props

      setTimeout(cleanAchievement, 5000)
    }

    render() {
        const { achievement } = this.props
        console.log()
        if (!achievement) return false

        return (
          <div style={{
            position: 'absolute',
            top: 0,
            background: 'red',
            width: '250px',
            left: 0,
          }}>
            Achievement unlocked !
            {achievement.title} - {achievement.condition}
            rewards : {(achievement.rewards || []).map((reward, i) => {
              return (<div key={i} >{reward.kind} = {reward.value}</div>)
            })}
          </div>
        )
    }
}

const mapStateToProps = (state) => ({
  achievement: state.notification.achievement,
})

const mapDispatchToProps = (dispatch) => ({
  cleanAchievement: (payload) => dispatch(cleanAchievement(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
