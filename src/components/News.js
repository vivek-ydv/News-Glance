import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    static defultProps = {
        country: 'in',
        pageSize: 8,
        category: 'genral'
    }
    static propTypes = {
        country: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        pageSize: PropTypes.number.isRequired,
        apiKey: PropTypes.string.isRequired
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsGlance`;
    }

    fetchMoreData = async () => {
        let data = await (fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`));
        this.setState({ page: this.state.page + 1 });
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };

    async componentDidMount() {
        this.props.setProgress(10);
        let data = await (fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`));
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.props.setProgress(75);
        this.setState({
            totalResults: parsedData.totalResults,
            articles: parsedData.articles,
            loading: false
        })
        this.props.setProgress(100);
    }

    render() {
        return <div>
            <h1 className="text-center my-4">NewsGlance - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
            {this.state.loading && <Spinner />}

            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner />}
            >
                <div className="container my-3 ">
                    <div className="row">
                        {this.state.articles.map((element) => {
                            let { title, description, urlToImage, url, author, publishedAt, source } = element;
                            return <div className="col-md-6 col-lg-4" key={url}>
                                <NewsItem title={title ? title : ""}
                                    description={description ? description : ""} imageUrl={urlToImage ? urlToImage : "https://c1.wallpaperflare.com/preview/21/93/67/news-yellow-newspaper-3d.jpg"}
                                    newsUrl={url}
                                    author={author ? author : 'Unknown'}
                                    date={publishedAt}
                                    source={source.name}
                                />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>;
    }
}
