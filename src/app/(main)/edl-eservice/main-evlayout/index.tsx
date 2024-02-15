import React from 'react'
import './styles.css'
import { Mernuservice } from '../menu-service';
import SlideShow from './slide-show';
interface Props {

}

export const Evlayout = (props: Props) => {
    return (
        <>
            <div className="area" style={{
                // background: '#4e71c8',
                // backgroundColor: 'linear-gradient(to left, #8faafb, #4e79c8)',
            }} >
            <div className='justify-center items-center place-items-center'>
                <div className="grid grid-cols-1">
                    <div className="col-span-6 md:col-span-6 relative group h-full mt-[0.5rem] md:mt-[1rem] px-[15px] flex items-center justify-center">
                        <SlideShow />
                    </div>
                    <div className="col-span-6 md:col-span-6 mt-[0.5rem] md:mt-[1rem]">
                        <Mernuservice />
                    </div>
                </div>
            </div>
            {/* <ul className="circles" style={{ zIndex: 0 }}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul> */}
            </div >
        </>
    )
}
