import React, { Component } from "react";
export class NewsItem extends Component {
  render() {
    const { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://images.hindustantimes.com/tech/img/2022/10/17/1600x900/_0f3052c8-e4f3-11e9-bf1a-4811dd02bcdc_1666014273808_1666014273808.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            {/* Line 19-22 is the badge */}
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left: "90%", zIndex: "1"}}>
                {source}     
            </span>
            
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                by {!author ? "unknown" : author} on
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More..
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default NewsItem;
