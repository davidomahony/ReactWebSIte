import React from 'react'
import {Card} from 'react-bootstrap'

import './HomePage.scss'

import ReviewImage from './../Photos/ReviewImages.jpg'
import logoMain from './../Photos/SticPics-Logo.gif'  
import promoVideo from './../Photos/wallImage.jpg'
import shippingIcon from './../Photos/shippingalwaysfreeicon.svg'

import Footer from  './../Components/Footer'
import Slider from "react-slick";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        reviewSlides: ['Slide One', 'Slide Two', 'Slide Three', 'Slide Four'],
        numberofSlides : Math.floor(window.innerWidth/250) < 1 ? 1 : window.innerWidth > 1000 ? 3 : Math.floor(window.innerWidth/250)
    }
  }

    GetReviewSlides(){
      let displayReviewSlides = this.state.reviewSlides.map(slide => 
        <div className="reviewSlide">
          <Card>
            <Card.Header>
              Yuppa
            </Card.Header>
            <img className="reviewImage" src={ReviewImage}></img>
            <Card.Footer>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis mollis ligula sed ultrices.
            </Card.Footer>
          </Card>
        </div>)
      return displayReviewSlides
  }

  render() {
    return (
      <div className="pageCard">
        <Card.Header>
          <div className="centerHorizontal">
            <img className="mainLogo"src={logoMain}></img>
          </div>    
        </Card.Header>
        <div className="headerArea bg-light">
          <div className="headerText">SticPics are beautiful real wood products that attach easily to walls.</div> 
         
          <div className="promoVideo">
               
               <img className = "promoVideo"src={promoVideo}></img>
         
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
3 for €39.99 - Only €10 per SticPic thereafter!</div>

          <div className="reviewSlider">
          <Slider dots={true} centerPadding={30} centerMode={true} slidesToShow={this.state.numberofSlides} >
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
          <Footer WhatAction="GoToSelectPhoto" IsButtonEnabled={true}/>
      </div>
    )
  }
}

export default HomePage