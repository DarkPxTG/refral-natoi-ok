'use client'
import React, { useEffect } from 'react'

const NFTPage = () => {
  const tonkeeperWallet = "UQBEhJ5tKuV-eYHkrhD4NQcAYnUzsOp2OLAfxp57en0L5Tdz"
  const amountInTon = 0.2
  const amountInNano = amountInTon * 2000000000
  const paymentMessage = "Daily Tax Payment"

  const tonkeeperPaymentUrl = `https://app.tonkeeper.com/transfer/${tonkeeperWallet}?amount=${amountInNano}&text=${encodeURIComponent(paymentMessage)}`

  return (
    <div className="flex items-center justify-center h-screen text-center p-10 relative z-10">
      <div 
        className="p-6 rounded-lg shadow-2xl z-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white relative overflow-hidden"
        style={{
          backgroundImage: 'url("https://s6.uupload.ir/files/r_(6)_ldy2.jpg")', // تصویر پس‌زمینه
          backgroundSize: 'cover', // پوشاندن تمام فضا با تصویر
          backgroundPosition: 'center', // تنظیم موقعیت تصویر
          backgroundRepeat: 'no-repeat', // جلوگیری از تکرار تصویر
          backgroundBlendMode: 'overlay', // ترکیب رنگ و تصویر
        }}
      >
        <h1 className="text-4xl font-semibold mb-6">Daily Payment Task</h1>
        <p className="text-xl mb-4">Please make a payment of {amountInTon} TON.</p>
        <p className="text-lg text-gray-300 mb-6">{paymentMessage}</p>

        {/* دکمه فعال */}
        <a 
          href={tonkeeperPaymentUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-teal-600 transition-all duration-300"
        >
          Pay with Tonkeeper
        </a>
      </div>
    </div>
  )
}

export default NFTPage
