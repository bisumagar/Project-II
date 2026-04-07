import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import MainCarouselData from './MainCarouselData';




const MainCarousel = () => {

    const items = MainCarouselData.map((item)=> <img className='carousel-pointer  h-130 w-full object-cover object-center' role='presentation' src={item.image} alt=''/>);

    return ( 
           <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={2000}
        infinite
    />
)
}

 
 export default MainCarousel;