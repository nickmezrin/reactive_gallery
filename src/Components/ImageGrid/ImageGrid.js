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
        return images.map((x, i) => this.Image(x.urls.small, x.likes, x.color, i))
    }

    Image(src, likes, color, delay)  { 
        const imgStyle = {
            animationDelay:  delay * 0.3 + 's',
        }
        const wrapStyle = {
            backgroundColor: color
        }
        return <div className="imagegrid__image-wrap" style={wrapStyle}>
            <img className="imagegrid__image"  style={imgStyle} src={src} alt="test"/>
            <div className="image-hover">
                <p>{likes}♥</p>
            </div>
        </div>
    }
} 


ImageGrid.propTypes = {
    images: PropTypes.array
};