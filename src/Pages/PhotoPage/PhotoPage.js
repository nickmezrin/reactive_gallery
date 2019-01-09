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
            color: null,
            image: null
        }
    }

    componentDidMount() {
        this.setState({
            loaded: false,
            imageId:  this.props.match.params.id,
            color: this.props.route.color
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
        const imgStyle = { backgroundColor: this.state.color };
        return <img style={imgStyle}
                    src={this.state.image.urls.regular} alt="test">
                </img>
    }

    loadImage() {
        this.apiProvider.getPhotoById(this.state.imageId)
        .subscribe(image => {
            this.setState({
                loaded: true,
                image: image
            })
        })
    }
}