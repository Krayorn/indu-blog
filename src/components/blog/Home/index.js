import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Redux
import { connect } from 'react-redux'
import { getAllArticles } from '../../../redux/actions/article'

// Layout
import RegularLayout from '../../../layouts/RegularLayout'

class Home extends Component {
    constructor(props) {
        super(props)

        this.props.getAllArticles()
    }

    render() {
        const { articles } = this.props

        return (
            <RegularLayout>
                <h2>Welcome on this Blog !</h2>

                {
                    articles.map((article) => {
                        return (
                            <div key={article._id} >
                                <h3>{article.title}</h3>
                                <Link to={`/${article._id}`} >Lire l'article !</Link>
                                <span>written by {article.author.username}</span>
                            </div>
                        )
                    })
                }

            </RegularLayout>
        )
    }
}

const mapStateToProps = (state) => ({
    articles: state.article.list || []
})

const mapDispatchToProps = (dispatch) => ({
    getAllArticles: (payload) => dispatch(getAllArticles(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
