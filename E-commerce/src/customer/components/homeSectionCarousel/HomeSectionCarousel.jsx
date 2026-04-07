import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Button } from "@mui/material";
import { useRef, useState } from 'react';
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeSectionCard from "../homeSectionCard/HomeSectionCard";

const HomeSectionCarousel = ({data,sectionName}) => {

    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 5 },
    };

    const items = data.slice(0,10) 
        .map((product, index) => <HomeSectionCard key={index} product={product} />);

    // how many items visible at once
    const visibleItems = responsive[1024].items;
  
    return (
        <div className='border'>
            <h2 className='text-2xl font-extrabold text-gray-800 p-5'>{sectionName}</h2>
            <div className="relative py-5">

                <AliceCarousel
                    ref={carouselRef}
                    items={items}
                    disableButtonsControls
                    disableDotsControls
                    mouseTracking
                    responsive={responsive}
                    onSlideChanged={(e) => setActiveIndex(e.item)}
                />

                {/* NEXT BUTTON (HIDE AT END) */}
                {activeIndex < items.length - visibleItems && (
                    <Button
                        onClick={() => carouselRef.current.slideNext()}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            right: 0,
                            transform: "translateX(50%)",
                            bgcolor: "white",
                            zIndex: 50,
                            minWidth: "40px"
                        }}
                    >
                        <KeyboardArrowLeftIcon
                            sx={{ transform: "rotate(180deg)", color: "black" }}
                        />
                    </Button>
                )}

                {/* PREV BUTTON (HIDE AT START) */}
                {activeIndex > 0 && (
                    <Button
                        onClick={() => carouselRef.current.slidePrev()}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: 0,
                            transform: "translateX(-50%)",
                            bgcolor: "white",
                            zIndex: 50,
                            minWidth: "40px"
                        }}
                    >
                        <KeyboardArrowLeftIcon sx={{ color: "black" }} />
                    </Button>
                )}

            </div>
        </div>
    );
};

export default HomeSectionCarousel;
