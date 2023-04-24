import React from "react";
import './App.css';
import HeroSlider , {Slide} from 'hero-slider';
import image1 from './7.png';
import image2 from './9.png';
import image3 from './8.png';
import image4 from './10.png';
import image5 from './11.png';
const Slider=()=>{
    return(
        <HeroSlider
        slidingAnimation="left_to_right"
        orientation="horizontal"
        initialSlide={1}
        onBeforeChange={(previousSlide,nextSlide)=> console.log("onBeforeChange",previousSlide,nextSlide)}
        onchange={nextSlide => console.log("onchange",nextSlide)}
        onAfterChange={nextSlide => console.log("onAfterChange",nextSlide)}
        style={{
        backgroundColor: "white",
        width: '200px',
        height: '200px'
        }}
        settings={{
        slidingDuration: 250,
        slidingDelay: 100,
        shouldAutoplay: true,
        shouldDisplayButtons: true,
        autoplayDuration: 3000,
        height: '10vh'
        }}
        >
        <Slide
        background={{
        backgroundImage: `url(${image1})`,
        backgroundAttachment: "fixed",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        filter: 'blur(10px)' // Ajout du filtre de flou
        }}
        >
        <div className="small-image-container">
          <img src={image1}  alt="image1" className="small-image" />
        </div>
      </Slide>
    
<Slide
    background={{
        backgroundImage: `url(${image2})`,
        backgroundAttachment: "fixed",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
filter: 'blur(10px)' // Ajout du filtre de flou
        }}
        >
        <div className="small-image-container">
          <img src={image2}  alt="image2" className="small-image" />
        </div>
      </Slide>
    
<Slide
    background={{
        backgroundImage: `url(${image3})`,
        backgroundAttachment: "fixed",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
filter: 'blur(10px)' // Ajout du filtre de flou
        }}
        >
        <div className="small-image-container">
          <img src={image3}  alt="image3" className="small-image" />
        </div>
      </Slide>
    


<Slide
    background={{
        backgroundImage: `url(${image4})`,
        backgroundAttachment: "fixed",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
filter: 'blur(10px)' // Ajout du filtre de flou
        }}
        >
        <div className="small-image-container">
          <img src={image4}  alt="image4" className="small-image" />
        </div>
      </Slide>
    

<Slide
    background={{
        backgroundImage: `url(${image5})`,
        backgroundAttachment: "fixed",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
vfilter: 'blur(10px)' // Ajout du filtre de flou
        }}
        >
        <div className="small-image-container">
          <img src={image5}  alt="image5" className="small-image" />
        </div>
      </Slide>
    
            
        </HeroSlider>
        
    )
}
 
export default Slider;