import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ImageGrid.css';
export class ImageGrid extends Component {

    render() {
        return <div className="imagegrid">
            {this.Images(this.props.images)}
                </div>
    }

    Images(images) {
        return images.map((x, i) => this.Image(x.urls.regular, x.likes, i))
    }

    Image(src, likes, delay)  { 
        const style = {
            animationDelay:  delay * 0.35 + 's'
        }
        return <div className="imagegrid__image-wrap">
            <img className="imagegrid__image"  style={style} src={src} alt="test"/>
            <div className="image-hover">
                <p>{likes}	♥</p>
            </div>
        </div>
    }
} 


ImageGrid.propTypes = {
    images: PropTypes.array
};