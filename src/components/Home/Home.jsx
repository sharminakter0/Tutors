import React from 'react';
import Banner from '../Banner/Banner';
import SplashCursor from '../SplashCursor/SplashCursor';
import Statas from '../statas/Statas';
import CategorySection from '../category/CategorySection';
import HomeHowItWorks from '../HomeHowItWorks/HomeHowItWorks';
import HomeTestimonials from '../HomeTestimonials/HomeTestimonials';
import OurTutors from '../OurTuy=tors/OurTutors';
import ExtraSection from '../ExtraSection/ExtraSection';
// import SplashCursor from './SplashCursor'

const Home = () => {
    return (
        <div className="">
            {/* <SplashCursor></SplashCursor> */}
             <Banner></Banner>

             <div className='w-11/12 mx-auto'>
             <Statas></Statas>
             <CategorySection></CategorySection>
             <OurTutors></OurTutors>
             <HomeHowItWorks></HomeHowItWorks>
             <ExtraSection></ExtraSection>
             <HomeTestimonials></HomeTestimonials>
        </div>
        </div>
    );
};

export default Home;