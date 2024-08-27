import React from 'react'

const  GaugeIcon:React.FC<React.SVGProps<SVGSVGElement>> =(props)=> {
  return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 21C7 21 2.5 18.5 1 14 2.5 9.5 7 7 12 7s9.5 2.5 11 7c-1.5 4.5-6 7-11 7z" />
        <path d="M12 7v14M12 7l-6 6M12 7l6 6" />
    </svg>
    );
  }


export default GaugeIcon