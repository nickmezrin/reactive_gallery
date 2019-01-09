import React, { Component } from 'react';
import { ImageGrid } from '../../Components/ImageGrid/ImageGrid';
import { HttpClient } from '../../Core/HttpClient';
import './SearchPage.scss'
import { ApiProvider } from '../../Core/ApiProvider';
import { interval } from 'rxjs';
import { mergeMap, concatMap } from 'rxjs/operators';

export class SearchPage extends Component {

  apiProvider = new ApiProvider(new HttpClient());
  constructor() {
    super();
    this.state = {
      filter: '',
      loaded: true,
      images: [],
      page: 1,
      randomPhoto: {
        color: '#eee',
        link: ''
      }
    }

    interval(5000)
      .pipe(
        concatMap(() => this.apiProvider.getRandomPhoto())
      ).subscribe(image => this.setState({
        ...this.state,
        randomPhoto: {
          link: image.urls.small,
          color: image.color
        }
      }));

    window.addEventListener('scroll', () => {
      const appTemplate = document.getElementsByClassName('App')[0]
      if (appTemplate) {
        const appHeight = appTemplate.offsetHeight;
        const offset = window.pageYOffset;
        const scrollHeight = window.outerHeight;
        const fetchGap = 300;
        if (appHeight - (offset + scrollHeight) < fetchGap && this.state.loaded) {
          this.fetchPage();
        }
      }
    });
  }

  render() {
    const headerStyles = {
      backgroundColor: this.state.randomPhoto.color
    };
    return (
      <div className="App">
        <div className="App__header" style={headerStyles}>
          <img src={this.state.randomPhoto.link}></img>
          <input autoFocus className="filter" type="text" onChange={this.handleChange} />
          <button className="submit-btn" onClick={this.fetchPage}>→</button>
        </div>
        <ImageGrid images={this.state.images}></ImageGrid>
        {this.state.loaded ? null : <div className="loader" />}
      </div>
    )
  }

  ImageGridResolving() {
    if (this.state.loaded || this.state.images.length > 0) {
      return <ImageGrid images={this.state.images}></ImageGrid>
    } else {
      return <div className="loader" />
    }
  }

  handleChange = (evt) => {
    this.setState({ filter: evt.target.value })
  }

  fetchPage = () => {
    if (this.state.filter) {
      this.setState({
        loaded: false,
      });
      this.apiProvider.getPhotosByQuery({
        query: this.state.filter,
        page: this.state.page
      }).subscribe(x => {
        this.setState({
          ...this.state,
          loaded: true,
          images: [...(this.state.images || []), ...x.results],
          page: this.state.page + 1
        });
      }); 
    }
    
  }

  componentDidMount() {
    window.addEventListener('keypress', (evt) => {
      if (evt.keyCode  === 13) {
        this.setState({
          ...this.state,
          page: 1,
          images: []
        });
        this.fetchPage();
      }
    })
  }

}