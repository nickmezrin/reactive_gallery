import React, { Component } from 'react';
import { ImageGrid } from '../../Components/ImageGrid/ImageGrid';
import { HttpClient } from '../../Core/HttpClient';
import './SearchPage.css'
import { ApiProvider } from '../../Core/ApiProvider';

export class SearchPage extends Component {

  apiProvider = new ApiProvider(new HttpClient());
  constructor() {
    super();
    this.state = {
      filter: '',
      loaded: true,
      images: []
    }
  }

  render() {
    return (
      <div className="App">
        <input autoFocus className="filter" type="text" onChange={this.handleChange} />
        <button className="submit-btn" onClick={this.handleClick}>→</button>
        {this.ImageGridResolving()}
      </div>
    )
  }

  ImageGridResolving() {
    if (this.state.loaded) {
      return <ImageGrid images={this.state.images}></ImageGrid>
    } else {
      return <div className="loader" />
    }
  }

  handleChange = (evt) => {
    this.setState({ filter: evt.target.value })
  }

  handleClick = () => {
    this.setState({
      ...this.state,
      loaded: false,
      images: []
    });
    this.apiProvider.getPhotosByQuery(this.state.filter).subscribe(x => {
      this.setState({
        ...this.state,
        loaded: true,
        images: x.results
      });
    });
  }
}