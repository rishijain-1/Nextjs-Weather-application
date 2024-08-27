import React from 'react'

const  SunsetIcon:React.FC<React.SVGProps<SVGSVGElement>> =(props)=> {
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
                <path d="M3 18h18M12 2v7m5-3l-5 5-5-5m-6 8h18M3 22h18" />
            </svg>
    );
  }


export default SunsetIcon