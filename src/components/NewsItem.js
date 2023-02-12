import React from "react";

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;

    return <div className="my-2 mx-2" >
        <div className="card " style={{ color: props.mode === "dark" ? "white" : "black", background: props.mode === "dark" ? "#212d2e" : "white" }}>
            <img src={imageUrl} className="card-img-top" alt="..." />
            <div className="card-body" >
                <span className={`position-absolute top-0 start-50 translate-middle badge rounded-pill bg-${props.mode === "dark" ? "primary" : "dark"}`}>
                    {source}
                </span>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                    {description}
                </p>
                <p className="card-text"><small className="text-muted">By {author}on {new Date(date).toGMTString()} </small></p>

                <a href={newsUrl} target="_blank" rel="noreferrer" className={`btn btn-sm btn-${props.mode === "dark" ? "primary" : "dark"}  d-flex justify-content-center`}>
                    Read More
                </a>
            </div>
        </div>
    </div>;
}

export default NewsItem
