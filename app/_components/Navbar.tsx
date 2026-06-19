import React from 'react'
import { Instrument_Serif } from 'next/font/google'

const instrumentSerif_italic = Instrument_Serif({
    weight: '400',
    style: 'italic',
});

const instrumentSerif_normal = Instrument_Serif({
    weight: '400',
    style: 'normal',
});

const Navbar = () => {
  return (
    <nav>
        <div className="absolute z-10 mt-4 left-8">
        <span className={` ${instrumentSerif_normal.className} text-[30px] text-white`}><a href="/">quiet labs</a></span>
        </div>
    </nav>
  )
}

export default Navbar