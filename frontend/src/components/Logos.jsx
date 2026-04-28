import React from 'react'

function Logos() {
  const items = [
    "20k+ Online Courses",
    "Lifetime Access",
    "Value For Money",
    "Lifetime Support",
    "Community Support"
  ];

  return (
    <div className="w-full flex items-center justify-center flex-wrap gap-4 px-6 md:px-12">
      {items.map((text, i) => (
        <div 
          key={i} 
          className="px-6 py-2 bg-gray-50 border border-gray-100 rounded-full cursor-default"
        >
          <span className="text-gray-600 font-bold text-sm tracking-wide">{text}</span>
        </div>
      ))}
    </div>
  )
}

export default Logos;
