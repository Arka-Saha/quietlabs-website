'use client'

import React from 'react'
import { Instrument_Serif } from 'next/font/google'
import Image from 'next/image'
import StarryBackground from '../_components/StarryBackground';

const instrumentSerif_italic = Instrument_Serif({
    weight: '400',
    style: 'italic',
});

const instrumentSerif_normal = Instrument_Serif({
    weight: '400',
    style: 'normal',
});

const betaTestingLink = "https://tally.so/r/QK4lGX"
const betaTestingClickHandler = () => {
//   window.location.href = betaTestingLink; 
  window.open(betaTestingLink, '_blank');
}

const HomePage = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-black">
        <StarryBackground />

        {/* controller pic */}
        <div className="absolute -top-30 right-0 z-0" style={{ transform: 'rotate(23.45deg)', marginRight: '-400px' }}>
            <Image
                src="/controller_homepage_img.png"
                alt="Controller"
                width={1250}
                height={833}
                priority
                quality={100}
            />
        </div>

        {/* overlay text univ pnp robo contr */}
        <div className="relative z-10 text-center text-white -mt-20">
            <div>
                <span className={` ${instrumentSerif_normal.className} text-[35px] md:text-[55px]`}>Universal</span>
                <span className={` ${instrumentSerif_italic.className} text-[35px] md:text-[55px]`}> Plug n Play</span>
            </div>
            <div className="-mt-2">
                <span className={` ${instrumentSerif_normal.className} text-[35px] md:text-[55px] ml-20 md:ml-40`}>Robotic Controller</span>
            </div>
        </div>

        <div className={`absolute bottom-50 left-8 z-10 text-white ${instrumentSerif_normal.className} text-[30px] md:text-[44px] underline text-right cursor-pointer`} onClick={()=> betaTestingClickHandler()}>
            join beta testing
        </div>

    </div>
  )
}

export default HomePage