import React from 'react'
import {Card, Modal, Button} from 'react-bootstrap'
import Cookies from 'universal-cookie';

import './HomePage.scss'

import ReviewImage from './../Photos/ReviewImages.jpg'
import logoMain from './../Photos/logoMain.svg'
import promoVideo from './../Photos/wallImage.jpg'

import {LoadingScreen} from './../Utility'
import Footer from  './../Components/Footer'
import Slider from "react-slick";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        reviewSlides: ['Slide One', 'Slide Two', 'Slide Three', 'Slide Four'],
        promoImageLoaded: false,
        numberofSlides : Math.floor(window.innerWidth/250) < 1 ? 1 : window.innerWidth > 1000 ? 3 : Math.floor(window.innerWidth/250),
        hasAcceptedCookieModal: false
    }
  }

  componentDidMount(){
    if (!this.state.hasAcceptedCookieModal){
      let cookie = cookies.get('hasAcceptedCookies')
      if (cookie === undefined || cookie) {
        this.setState({hasAcceptedCookieModal: cookie})
      }
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
          <div className="headerText"> Sustainable Wood Frames</div> 
          <div className="promoVideo">
            <img className = "promoVideo"src={promoVideo} onLoad={() => this.setState({promoImageLoaded: true})}></img>
          </div>
          <br/>
          <div className="reviewStars bg-light">
            <svg class="bi bi-star-fill text-primary" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
          </div> 
          <br/>
          <div className="reviewStars bg-light">
            <h5>
            3 for €39.99 - Only €10 per extra tile!
            </h5>
          </div>
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
          <Modal className="loadingModal"
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              animation={true}
              show={!this.state.promoImageLoaded}>
            <LoadingScreen/>
          </Modal>
          <Modal show={!this.state.hasAcceptedCookieModal}>
            <Modal.Header>
              Cookies
            </Modal.Header>
            <Modal.Body>
              Boring legal stuff
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => 
              {
                this.setState({hasAcceptedCookieModal: true})
                cookies.set("hasAcceptedCookies", true)
              }}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
      </div>
    )
  }
}

export default HomePage

const cookies = new Cookies();