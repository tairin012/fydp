import React from 'react'

function LoadingAnimation() {
  return (
    <div className="my-10 flex items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-solid border-gray-300 border-t-orange-500" />
    </div>
  )
}

export default LoadingAnimation
