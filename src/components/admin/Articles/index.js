import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Redux
import { connect } from 'react-redux'
import { getAllArticles, deleteArticle } from '../../../redux/actions/article'

// Layout
import RegularLayout from '../../../layouts/RegularLayout'

class AdminArticles extends Component {
    constructor(props) {
        super(props)

        this.props.getAllArticles()
    }

    deleteArticle = (e, id) => {
        e.preventDefault()
        this.props.deleteArticle({
            id,
            token: this.props.user.token
        })
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
                                <Link to={`/article/${article._id}`} >Lire l'article !</Link>
                                <span>written by {article.author.username}</span>
                                <form>
                                    <button onClick={(e) => this.deleteArticle(e, article._id)} >Supprimer l'article !</button>
                                </form>
                                <Link to={`/edit/${article._id}`}>Editer l'article</Link>
                            </div>
                        )
                    })
                }

            </RegularLayout>
        )
    }
}

const mapStateToProps = (state) => ({
    articles: state.article.list || [],
    user: state.auth.user || {},
})

const mapDispatchToProps = (dispatch) => ({
    getAllArticles: () => dispatch(getAllArticles()),
    deleteArticle: (payload) => dispatch(deleteArticle(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminArticles)
