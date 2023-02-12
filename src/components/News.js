import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const fetchMoreData = async () => {
        let data = await (fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`));
        setPage(page + 1);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
    };

    const updateNews = async () => {
        props.setProgress(10);
        let data = await (fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`));
        props.setProgress(50);
        let parsedData = await data.json();
        props.setProgress(75);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsGlance`;
        updateNews();
    }, [])

    return <div>
        <h1 className="text-center" style={{ margin: '40px 0', marginTop: '90px' }}>NewsGlance - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}

        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner />}
        >
            <div className="container my-3 ">
                <div className="row">
                    {articles.map((element) => {
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

News.defultProps = {
    country: 'in',
    pageSize: 8,
    category: 'genral'
}
News.propTypes = {
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    apiKey: PropTypes.string.isRequired
}

export default News