import React, { useState } from 'react'

const TruncatedText = ({text, limit =100}) => {
  const [expanded, setExpanded] = useState(false);

  if(!text) return null;

  const isLong = text.length > limit;
  const displayText = expanded ? text : text.slice(0, limit) + (isLong ? "..." : "");

  return (
    <div className='text-sm text-slate-600'>
      {displayText}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className='ml-2 text-indigo-600 hover:underline text-xs'
        >
          {expanded ? 'view Less' : 'View More'}
        </button>
      )}
    </div>
  )
}

export default TruncatedText