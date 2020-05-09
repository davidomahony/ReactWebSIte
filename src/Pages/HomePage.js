import React from 'react'
import {Card, Navbar, Pagination, PageItem, Carousel, Button} from 'react-bootstrap'

import axios from 'axios';
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