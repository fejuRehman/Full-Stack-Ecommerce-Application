import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizonalCardProduct from '../components/HorizonalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const home = () => {
  return (
    <div>
       <CategoryList/>
       <BannerProduct/>
       
       <HorizonalCardProduct category={"airpodes"} heading={"Tops's Airpodes"} />
       <HorizonalCardProduct category={"watches"} heading={"Popular Watches"} />

       <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
       <VerticalCardProduct category={"Mouse"} heading={"Mouse"} />
       <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
       <VerticalCardProduct category={"camera"} heading={"camera's & Photography"} />
       <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} />
       <VerticalCardProduct category={"speakers"} heading={"Speakers"} />
       <VerticalCardProduct category={"refrigerator"} heading={"Refrigerators"} />
       <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
    </div>
  )
}

export default home