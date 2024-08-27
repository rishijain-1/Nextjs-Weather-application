import React from 'react'

const  EyeIcon:React.FC<React.SVGProps<SVGSVGElement>> =(props)=> {
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
            <circle cx="12" cy="12" r="3" />
            <path d="M21 12c-2.5 4-5.5 6-9 6s-6.5-2-9-6 4.5-6 9-6 6.5 2 9 6z" />
        </svg>    
    );
  }


export default EyeIcon