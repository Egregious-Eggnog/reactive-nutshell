// Author: Sophia Hoffman

import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import ArticleCards from './ArticleCards';
import ArticleManager from '../../modules/ArticleManager';
import { Button } from 'react-bootstrap';
import './ArticleCards.css';


class ArticleList extends Component {
    state = {
        articles:[]
    }

    componentDidMount() {
        console.log("ARTICLE LIST: ComponentDidMount");
        // let friendsArray = []
        // ArticleManager.getFriends()
        // .then(results => {
        //     console.log(results)
        //     results.forEach(result => friendsArray.push(result.userId));
        //     return friendsArray
        // })
        // .then(result => 
        //     ArticleManager.getArticles(result))
        // .then(articles => {
        //     this.setState({
        //         articles: articles,
        //     })
        // })
        this.setArticleState()
    }

    // function to allow for rerendering with friends news articles
    setArticleState = () => {
        let friendsArray = []
        ArticleManager.getFriends()
        .then(results => {
            results.forEach(result => friendsArray.push(result.userId));
            return friendsArray
        })
        .then(result => ArticleManager.getArticles(result))
        .then(articles => {
            this.setState({
                articles: articles,
            })
        })

    }

    deleteArticle = articleId => {
        ArticleManager.deleteArticle(articleId)
        .then(this.setArticleState)
        // .then(() => {
        //     ArticleManager.getArticles()
        //     .then((newArticles) => {
        //         this.setState({
        //             articles: newArticles
        //         })
        //     })
        // })
    }

    // componentDidMount() {
    //     console.log("ARTICLE LIST: ComponentDidMount");
    //     ArticleManager.getUserArticles()
    //     .then(articles => {
    //         console.log(articles)
    //         this.setState({
    //             articles: articles,
    //         })
    //     })
    // }

    // deleteArticle = articleId => {
    //     ArticleManager.deleteArticle(articleId)
    //     .then(() => {
    //         ArticleManager.getUserArticles()
    //         .then((newArticles) => {
    //             this.setState({
    //                 articles: newArticles
    //             })
    //         })
    //     })
    // }

    render() {
        console.log("ARTICLE LIST: Render");

        return (
            <React.Fragment>
            <div className="button-new" align="center">
                <Button variant="primary" type="button" onClick={() => this.props.history.push("articles/new")}>New Article</Button>
            </div>
            <div className="container-cards" align="center">
                {this.state.articles.map(article => 
                <ArticleCards
                key={article.id} 
                article={article} 
                deleteArticle = {this.deleteArticle}
                {...this.props}
                /> )}
            </div>
            </React.Fragment>
        )
    }
}



export default ArticleList