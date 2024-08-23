import React from 'react';
import { MdWbSunny,MdMyLocation, MdOutlineLocationOn } from 'react-icons/md';
import Searchbox from './Searchbox';

type Props = {}

export default function Navbar({}: Props) {
  return (
    <div className="shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
            <h1 className="flex items-center justify-center gap-2 text-gray-500 text-3xl">
                <p className="flex items-center justify-center gap-2">Weather</p>
                <MdWbSunny className="text-3xl mt-1 text-yellow-300"/>
            </h1>
            <section className="flex gap-2 items-center">
                <MdMyLocation className="text-2xl text-slate-800 hover:opacity-70 cursor-pointer"/>
                <MdOutlineLocationOn/>
                <p className="text-slate-900/80 text-sm">India</p>
                <Searchbox value={''} onChange={undefined} onSubmit={undefined} />
            </section>
        </div>
    </div>
  );
}
