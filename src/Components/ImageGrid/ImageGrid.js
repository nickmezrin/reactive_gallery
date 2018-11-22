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
        return images.map((x, i) => this.Image(x.urls.regular, i))
    }

    Image(src, delay)  { 
        const style = {
            animationDelay:  delay * 0.35 + 's'
        }
        return <img className="imagegrid__image"  style={style} src={src} alt="test"/>
    }
} 


ImageGrid.propTypes = {
    images: PropTypes.array
};