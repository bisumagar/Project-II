import mens_kurta from '../../../data/mens_kurta'
import MainCarousel from '../../components/HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../components/homeSectionCarousel/HomeSectionCarousel'

const HomePage = () => {
  return (
    <div>
     <MainCarousel />
     <div className='space-y-10 py-20 flex flex-col justify-center px-3 lg:px-7'>
        <HomeSectionCarousel data={mens_kurta} sectionName={""}/>
        <HomeSectionCarousel data={mens_kurta} sectionName={""}/>
        {/* <HomeSectionCarousel data={mens_kurta} sectionName={""}/>
        <HomeSectionCarousel data={mens_kurta} sectionName={""}/>
        <HomeSectionCarousel data={mens_kurta} sectionName={""}/>
         */}
     </div>

    </div>

  )
}

export default HomePage
