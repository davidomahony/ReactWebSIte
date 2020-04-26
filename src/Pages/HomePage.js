import React from 'react'
import {Card, Navbar, Pagination, PageItem, Carousel, Button} from 'react-bootstrap'

import ReactPlayer from 'react-player'

import './HomePage.scss'

import ReviewImage from './../Photos/ReviewImages.jpg'

import Footer from  './../Components/Footer'

import Slider from "react-slick";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        reviewSlides: ['Slide One', 'Slide Two', 'Slide Three', 'Slide Four'],
        numberofSlides : Math.floor(window.innerWidth/400) < 1 ? 1 : Math.floor(window.innerWidth/400)
    }
  }

    GetReviewSlides(){
      let displayReviewSlides = this.state.reviewSlides.map(slide => 
        <div className="reviewSlide">
          <Card>
            <Card.Header>
              Yuppa
            </Card.Header>
            <img src={ReviewImage}></img>
            <Card.Footer>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis mollis ligula sed ultrices.
            </Card.Footer>
          </Card>
        </div>)
      return displayReviewSlides
  }


  render() {
    return (
      <div classname="pageCard">
            <Card.Header>
              <div className="centerHorizontal">
                <h2>
                 Home
                </h2>
              </div>
          </Card.Header>
          <ReactPlayer classname="player"
            width='100%'
            height='100%'
            url='https://www.youtube.com/watch?v=o_RXZyojl8k&list=RDo_RXZyojl8k&start_radio=1'/>
            <Slider dots={true} slidesToShow={this.state.numberofSlides} >
            {this.GetReviewSlides()}
            </Slider>
          <Footer WhatAction="GoToSelectPhoto" IsButtonEnabled={true}/>
      </div>
    )
  }
}

export default HomePage