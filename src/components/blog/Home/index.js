import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Redux
import { connect } from 'react-redux'
import { getAllArticles } from '../../../redux/actions/article'

// Layout
import RegularLayout from '../../../layouts/RegularLayout'

// Style
import {
    Title,
    ArticleContainer,
    EndContainer,
} from './style'

class Home extends Component {
    constructor(props) {
        super(props)

        this.props.getAllArticles()
    }

    render() {
        const { articles } = this.props

        return (
            <RegularLayout>
                <Title>All Articles !</Title>

                {
                    articles.map((article) => {
                        return (
                            <ArticleContainer key={article._id} >
                                <Title>{article.title}</Title>
                                <p>{article.content.substring(0,1000)}...</p>
                                <Link to={`/article/${article._id}`} >Read more</Link>
                                <EndContainer>
                                    <span>written by {article.author.username}</span><br />
                                    <span>{article.comments.length} comments</span>
                                </EndContainer>
                            </ArticleContainer>
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
    getAllArticles: () => dispatch(getAllArticles()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
