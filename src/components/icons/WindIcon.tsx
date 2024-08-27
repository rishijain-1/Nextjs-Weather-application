import React from 'react'

const  WindIcon:React.FC<React.SVGProps<SVGSVGElement>> =(props)=> {
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
          <path d="M17.2 10.8a2.6 2.6 0 0 0-5.2 0c0 2.6 3.9 2.6 3.9 5.2s-3.9 2.6-3.9 0M6.1 12H17M6.1 8h9.1" />
        </svg>
    );
  }


export default WindIcon