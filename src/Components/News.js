import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 6,
    category: "technology",
  };
  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  // articles = [
  //     {
  //       "source": { "id": null, "name": "YouTube" },
  //       "author": null,
  //       "title": "Dallas Cowboys vs. Philadelphia Eagles | 2022 Week 6 Highlights - NFL",
  //       "description": "Check out our other channels:NFL Mundo https://www.youtube.com/mundonflNFL Brasil https://www.youtube.com/c/NFLBrasilOficialNFL UK https://www.youtube.com/ch...",
  //       "url": "https://www.youtube.com/watch?v=r0SBrSG08lw",
  //       "urlToImage": "https://i.ytimg.com/vi/r0SBrSG08lw/maxresdefault.jpg",
  //       "publishedAt": "2022-10-17T03:40:25Z",
  //       "content": null
  //     },
  //     {
  //       "source": { "id": "the-washington-post", "name": "The Washington Post" },
  //       "author": "Nathan Grayson",
  //       "title": "G4 shuts down after layoffs, Frosk firing, WWE deal falls apart - The Washington Post",
  //       "description": "Comcast's video game-centric channel hoped to reboot amid heightened interest in gaming culture.",
  //       "url": "https://www.washingtonpost.com/video-games/2022/10/16/g4-shutdown-frosk-layoffs-wwe/",
  //       "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/NNVZ5HHIXZCJDEEM7YDGV5V5QI.jpg&w=1440",
  //       "publishedAt": "2022-10-17T03:31:00Z",
  //       "content": "After mass layoffs less than a year after its return, Comcasts video game-centric television and online network G4 is shutting down, according to a report from Deadline citing an internal email from … [+2723 chars]"
  //     },
  //     {
  //       "source": { "id": "cnn", "name": "CNN" },
  //       "author": "Dan Merica",
  //       "title": "Herschel Walker defends use of 'honorary' sheriff's badge in Georgia Senate debate - CNN",
  //       "description": "Republican Senate candidate Herschel Walker defended pulling out a sheriff's badge during Friday's closely watched debate in Georgia, telling NBC in an interview that aired on Sunday it was \"a legit,\" but honorary badge from his hometown sheriff's department.",
  //       "url": "https://www.cnn.com/2022/10/16/politics/herschel-walker-police-badge-georgia-senate-race/index.html",
  //       "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/221017103405-herschel-walker-101122.jpg?c=16x9&q=w_800,c_fill",
  //       "publishedAt": "2022-10-17T03:29:00Z",
  //       "content": "Republican Senate candidate Herschel Walker defended pulling out a sheriffs badge during Fridays closely watched debate in Georgia, telling NBC in an interview that aired on Sunday it was a legit, bu… [+2157 chars]"
  //     },
  //     {
  //       "source": { "id": null, "name": "KMBC Kansas City" },
  //       "author": "Peyton Headlee",
  //       "title": "Multiple car crash leads to homicide investigation Kansas City, North - KMBC Kansas City",
  //       "description": "One man is dead, and another person is in the hospital in critical condition.",
  //       "url": "https://www.kmbc.com/article/multiple-car-crash-leads-to-homicide-investigation-in-north-kansas-city-missouri/41635392",
  //       "urlToImage": "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/for-web-1665964843.jpg?crop=0.894xw:0.893xh;0,0&resize=1200:*",
  //       "publishedAt": "2022-10-17T02:59:00Z",
  //       "content": "KANSAS CITY, Mo. —Police are opening a homicide investigation in the busy area of Northeast Vivion Road and North Oak. \r\nOfficers responded to a reported shooting around 3:30 p.m. and arrived to a cr… [+1139 chars]"
  //     }
  // ]
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    console.log("Hello I  am constructor from new component.");
    this.state = {
      articles: [],
      loading: true,  
      // we will make loading: true when we will show spinner
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}- NewsBird`;
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  // componendidmount is a lifecycle method. It will run after the render method.

  handlePreviousClick = async () => {
    console.log("You clicked Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=${this.props.apiKey}&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults,
    });
  };
  handleNextClick = async () => {
    console.log("You clicked next");
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=${this.props.apiKey}&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      {
        this.setState({ loading: true });
      } //when data is requested loading: true
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      // {this.setState({loading: false})}//as data is retrieved, loading: false
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
        totalResults: parsedData.totalResults,
      });
    }
  };
  fetchMoreData = async() => {
    this.setState({page: this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
    
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ 
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
    });
  }
  render() {
    return (
      <>
        <h2 className="text-center">
          Newsbird: Top Headlines Of{" "}
          {this.capitalizeFirstLetter(this.props.category)} Today!
        </h2>
        {this.state.loading&& <Spinner/>}
        <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            // inverse={true} //
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
          >
        {/* we will comment this Spinner component due to infinite scroll bar at line 128 */}
        
        {/* line 100 means if teh state of loading is true., show spinner component */}
        <div className="container">
        <div className="row">
          {/* Line- 114:if state.loading is true, dont show newsitems, if loading is not true then show. */}
          
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4 my-2" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                ></NewsItem>
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            PREVIOUS
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            NEXT
          </button>
        </div>
      </>
    );
  }
}
export default News;
