import React from 'react'
import {Card, Modal, Button} from 'react-bootstrap'

import './HomePage.scss'

import ReviewImage from './../Photos/ReviewImages.jpg'; 
import instagram from './../Photos/instagram.svg';
import logoMain from './../Photos/SticPicsLogo.gif';
import promoVideo from './../Photos/wallImage.jpg';
import frame from './../video/frame2.mp4';
import play from './../Photos/play.svg';



import Footer from  '../Components/Footer'
import Slider from "react-slick";

import { useHistory } from "react-router-dom";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        reviewSlides: ['Slide One', 'Slide Two', 'Slide Three', 'Slide Four', 'Slide Four'],
        promoImageLoaded: false,
        infinite: true,
        centerMode: true,
        numberofSlides : Math.floor(window.innerWidth/250) < 1 ? 1 : window.innerWidth > 1000 ? 4 : Math.floor(window.innerWidth/250),
        // slidesToShow: 4,
        active: false,
        hasAcceptedCookieModal: false
    }

  //   constructor(props) {
  //     super(props);
  //     this.addActiveClass= this.addActiveClass.bind(this);
  //     this.state = {
  //         active: false,
  //     };
  // }
  // toggleClass() {
  //     const currentState = this.state.active;
  //     this.setState({ active: !currentState });
  // };
  }

  toggleClass() {
      const currentState = this.state.active;
      this.setState({ active: !currentState });
  };

    GetReviewSlides(){
      let displayReviewSlides = this.state.reviewSlides.map(slide => 
        <div className="reviewSlide">
          <Card>            
            <img className="reviewImage" src={ReviewImage}></img>
            <Card.Header>
              <img className="instragram_Icon" src={instagram} alt=""/>
              @ariCool.gut
            </Card.Header>
            <Card.Footer>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis mollis ligula sed ultrices.
            </Card.Footer>
          </Card>
        </div>)
      return displayReviewSlides
  }
  // Very messy dont really like the look of it
  render() {
    //new added array for carousel settings 
    var settings = {
      dots: true,
      infinite: true,
      centerMode: true,
      speed: 600,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [        
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 0,
            centerMode: false,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false,
          }
        }
      ]
    };


    return (
      <div className="pageCard">
        <header className="page_header">
          <div className="centerHorizontal">
            <img className="mainLogo" onLoad={() => this.setState({promoImageLoaded: true})} src={logoMain}></img>
          </div>    
        </header>
        <div className="headerArea bg-light">
          <div className="headerText">SticPics are beautiful real wood products that attach easily to walls.</div> 
            <div className="promoVideo">
                <div className="videoPlayBtn" onClick={() => {this.refs.video.play()}}>
                  <img src={play} alt=""/>
                </div>
                <div className="photoFrame_video">
                  <video muted="true" ref="video">
                    <source src={frame} type="video/mp4"/>
                  </video>
                </div>
            </div>
            
          </div>
        <div className="headerText3 bg-light">
          <div className="headerText2">Love Real Wood. Love Sustainability</div> 
            One Perfect Size - Removable, reusable and leave no marks</div>  
          <div className="reviewStars bg-light"><svg class="bi bi-star-fill text-primary" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg><svg class="bi bi-star-fill text-primary" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg><svg class="bi bi-star-fill text-primary" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg><svg class="bi bi-star-fill text-primary" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg><svg class="bi bi-star-fill text-primary" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
          <p>Shipping is always free!</p>
          {/* <img className="shippingIcon" src={shippingIcon}></img> */}
          </div> 
          <div className="priceText bg-light">
          3 for €39.99 - Only €10 per extra tile!</div>

          <div className="reviewSlider">
          <Slider {...settings}>
              {this.GetReviewSlides()}
          </Slider>
          </div>
          {// I am going to make a componenet for the div below in time
          }
          <div class="row">
            <div class="column"> Terms Of Use</div>
            <div class="column"> Privacy Policy</div>
            <div class="column"> Contact Us </div>
          </div> 
          <Footer link="SelectPhotos" label="Select Photos" IsButtonEnabled={true}/>
      </div>
    )
  }
}

export default HomePage