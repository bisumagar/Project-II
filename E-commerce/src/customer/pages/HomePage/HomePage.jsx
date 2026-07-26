import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findProducts } from '../../../State/Products/Action'
import MainCarousel from '../../components/HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../components/homeSectionCarousel/HomeSectionCarousel'

const HomePage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      findProducts({
        color: "",
        size: "",
        minPrice: 0,
        maxPrice: 1000000,
        discount: 0,
        category: "",
        stock: "",
        sort: "price_low",
        page: 0,
        pageSize: 50,
      })
    );
  }, [dispatch]);

  return (
    <div>
     <MainCarousel />
     <div className='space-y-10 py-20 flex flex-col justify-center px-3 lg:px-7'>
        <HomeSectionCarousel data={products || []} sectionName={"Latest Products"}/>
        <HomeSectionCarousel data={products || []} sectionName={"Trending Products"}/>
        {/* <HomeSectionCarousel data={mens_kurta} sectionName={""}/>
        <HomeSectionCarousel data={mens_kurta} sectionName={""}/>
        <HomeSectionCarousel data={mens_kurta} sectionName={""}/>
         */}
     </div>

    </div>

  )
}

export default HomePage
