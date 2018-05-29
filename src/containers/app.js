import React, {Component} from 'react'
import SearchBar from '../components/search-bar.js'
import VideoList from './video-list.js'
import axios from 'axios'
import VideoDetail from '../components/video-detail.js'
import Video from '../components/video.js'

const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const API_KEY = "api_key=4da32e0f71c9d17883cf6acdc7d548fe"
const SEARCH_URL = "search/movie?language=fr&include_adult=false"

class App extends Component {
    constructor(props){
        super(props)
        this.state = {moviesList:{}, currentMovie:{}}
    }

    componentWillMount() {
        this.initMovies()
    }

    initMovies(){
        axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then((response) => {
            this.setState({moviesList:response.data.results.slice(1,6), currentMovie:response.data.results[0]},function(){
                this.applyVideoToCurrentMovie()
            })
        })
    }

    applyVideoToCurrentMovie(){
        axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`).then((response) => {
            if(response.data.videos.results[0] && response.data.videos.results[0].key){
            const youtubeKey = response.data.videos.results[0].key
            let newCurrentMovieState = this.state.currentMovie
            newCurrentMovieState.videoId = youtubeKey
            this.setState({currentMovie : newCurrentMovieState})
            }
        })
    }

    onClickListItem(movie){
        this.setState({currentMovie:movie},function(){
            this.applyVideoToCurrentMovie()
            this.setRecommandation()
        })
    }

    onClickSearch(searchtext){
        if(searchtext){
            axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchtext}`)
                .then((response) => {
                    if(response.data && response.data.results[0]){
                        if(response.data.results[0].id != this.state.currentMovie.id){
                            this.setState({currentMovie: response.data.results[0]},() => {
                                this.applyVideoToCurrentMovie()
                                this.setRecommandation()
                            })
                        }
                    }
                })
        }
    }

    setRecommandation(){
        axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`)
            .then((response) => {
                this.setState({moviesList:response.data.results.slice(0,5)})
            })
    }


    render() {
        const renderVideoList = () => {
            if ( this.state.moviesList.length >=5) {
                return <VideoList moviesList={this.state.moviesList} callback={this.onClickListItem.bind(this)}/>
            }
        }
        return (
            <div>
                <div className="search_bar">
                     <SearchBar callback={this.onClickSearch.bind(this)}/>   
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <Video videoId={this.state.currentMovie.videoId}/>
                        <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview}/>
                        
                    </div>
                    <div className="col-md-4">
                        {renderVideoList()}
                    </div>
                </div>
            </div>
        )
    }
    
}

export default App