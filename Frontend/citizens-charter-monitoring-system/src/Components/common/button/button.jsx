import React from 'react'

const button = ({label,icon}) => {
  return (
    <div className='ccm-com-btn-con'>
      <button className='ccm-com-btn'>{label}{icon}</button>
    </div>
  )
}

export default button
