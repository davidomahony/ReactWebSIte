import React from 'react'
import {Card, Navbar, Pagination, PageItem, Carousel, Button} from 'react-bootstrap'

import axios from 'axios';
import ReactPlayer from 'react-player'

import './HomePage.scss'

import ReviewImage from './../Photos/ReviewImages.jpg'
import logoMain from './../Photos/logoMain.svg'
import promoVideo from './../Photos/wallImage.jpg'

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

  // GetUrl = (e) => {
  //     e.preventDefault();
  //     let files;
  //     if (e.dataTransfer) {
  //       files = e.dataTransfer.files;
  //     } else if (e.target) {
  //       files = e.target.files;
  //     }
  //     try {
  //       axios.post('https://ogiwiln1l8.execute-api.eu-west-1.amazonaws.com/develop/presigned-post-data?name=' + files[0].name).then(response =>{
  //       let fd = new FormData();
  //       //fd.append()
  //        fd.append("file", files[0]); 
  //        try
  //        {
  //         axios.put(response.data.signed_url, fd)
  //        }
  //        catch{
  //          console.log("err")
  //        }
        
  //       }).then(response => {
  //         console.log(response)
  //       })
  //     } catch (error) {
  //       console.error(error)
  //     }

    // let fd = new FormData();
    // fd.append("file", files[0]);
    // console.log("getn da url")
    // const Http = new XMLHttpRequest();
    // const url='https://ogiwiln1l8.execute-api.eu-west-1.amazonaws.com/develop/presigned-post-data?name=' + files[0].name;
    // Http.open("POST", url);
    // Http.send();
    // const HttpA = new XMLHttpRequest();
    // Http.onreadystatechange = (e) => 
    // {
    //   let signedUrl = JSON.parse(Http.responseText)
    //   console.log(signedUrl)
    //   const xhr = new XMLHttpRequest();
    //   xhr.open('PUT', signedUrl.signed_url);
    //   xhr.onreadystatechange = (e) => {
    //     console.log(e);
    //     if(xhr.readyState === 4){
          
    //       if(xhr.status === 200){

    //       }
    //       console.log(xhr.status)
    //     }
    //   };
    //   xhr.send(files[0]);

    // }
//};

  render() {
    return (
      <div classname="pageCard">
        <Button onClick={() => this.GetUrl()}>
          Test url
        </Button>
        <label htmlFor="uploader">
            <i className="fa fa-upload blue fa-3x"></i>
          </label>
        <input id="uploader" type="file" onInput={this.GetUrl}></input>
            <Card.Header>
              <div className="centerHorizontal">
          
               
                <img className="mainLogo"src={logoMain}></img>
         
              </div>
                 
          </Card.Header>
          <div className="headerText">SticPics are beautiful real wood products that attach easily to walls.</div> 
          <div className="headerText2 bg-light">Love Real Wood. Love Sustainability</div>  
          <div className="promoVideo">
               
               <img className = "promoVideo"src={promoVideo}></img>
         
             </div>
             <div className="reviewStars bg-light">
One Perfect Size - Removable, reusable and leave no marks</div>  
<div className="reviewStars bg-light"><svg class="bi bi-star-fill text-primary" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg></div> 
<div className="reviewStars bg-light">
3 for €39.99 - Only €10 per extra tile!</div>
            <Slider dots={true} slidesToShow={this.state.numberofSlides} >
            {this.GetReviewSlides()}
            </Slider>
          <Footer WhatAction="GoToSelectPhoto" IsButtonEnabled={true}/>
      </div>
    )
  }
}

export default HomePage