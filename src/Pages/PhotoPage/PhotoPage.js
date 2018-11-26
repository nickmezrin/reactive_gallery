import React, { Component } from 'react';
import { ApiProvider } from '../../Core/ApiProvider'
import { HttpClient } from '../../Core/HttpClient'
import './PhotoPage.css'

export class PhotoPage extends Component {
    apiProvider = new ApiProvider(new HttpClient());
    constructor() {
        super();
        this.state = {
            loaded: false,
            imageId: null,
            image: null
        }
    }

    componentDidMount() {
        this.setState({
            loaded: false,
            imageId:  this.props.match.params.id
        }, () => this.loadImage())
        
    }

    render() {
        return (
            <section> { this.resolveLoading() } </section>
        )
    }

    resolveLoading() {
        if (this.state.loaded) {
            return this.Image()
        } else {
            return <p>Loading...</p>
        }
    }

    Image() {
        return <img src={this.state.image.urls.regular} alt="test"></img>
    }

    loadImage() {
        this.apiProvider.getPhotoById(this.state.imageId)
        .subscribe(image => {
            console.log(image)
            this.setState({
                loaded: true,
                image: image
            }, () => console.log(this.state))
        })
    }
}