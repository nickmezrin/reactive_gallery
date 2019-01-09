import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ImageGrid.css';
import { Link } from 'react-router-dom';
export class ImageGrid extends Component {

    render() {
        return <div className="imagegrid">
            {this.Images(this.props.images)}
        </div>
    }

    Images(images) {
        return images.map(x => this.Image(x.urls.small, x.likes, x.color, x.id))
    }

    Image(src, likes, color, id) {
        const imgStyle = {
            animationDelay: '0.3s',
        }
        const wrapStyle = {
            backgroundColor: color
        }
        return (
            <Link to={`/photo/${id}`} key={id} color={color}>
                <div className="imagegrid__image-wrap" style={wrapStyle}>
                    <img className="imagegrid__image" style={imgStyle} src={src} alt="test" />
                    <div className="image-hover">
                        <p>{likes}♥</p>
                    </div>
                </div>
            </Link>
        )

    }
}


ImageGrid.propTypes = {
    images: PropTypes.array
};