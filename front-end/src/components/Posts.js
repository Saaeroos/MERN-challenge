import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
// import Operations from './Operations';

class Posts extends Component {
    constructor(props){
        super(props);
        console.log(props);
            this.state ={
                posts: null,
            }

    }

    handleVote(id){
        console.log('hi');
        axios.put('http://localhost:8080/api/post/vote/'+ id)
            .then(result => {
                window.location.href = "/mainpage"
            })
            .catch(error => console.log(error))

    }

    componentDidMount(){
        console.log(this.state);
        let _this= this;
        axios.get('http://localhost:8080/api/posts')
            .then(result => {
                _this.setState({
                    posts: result.data
                })
            })
            .catch(error =>console.log(error))
    }

    render() {
        // console.log(this.state.posts);
        // if(this.state.error){
        //     return <p> please login</p>
        // }
        return (
            <div>
                <br />
                <br />
                
                {this.state.posts
                ?
                <div>
                {this.state.posts.map(function(post){
                  
                            return(

                                <div key={post._id}>
                                    <h4>{post.text}</h4>
                                    <br />
                                    <h3>Uploader: {post.user}</h3>
                                    <h3>Upvotes: {post.vote}</h3>
                                    <button onClick={this.handleVote.bind(this, post._id)} >Upvote</button>
                                    <hr />
                                </div>
                            )
                        }.bind(this))}
                </div>

                :
                <p> there is no posts </p>
                }
            </div>
        );
    }
}

export default Posts;