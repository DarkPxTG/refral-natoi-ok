'use client'
import React from 'react'

const NFTPage = () => {
  const tonkeeperWallet = "UQBEhJ5tKuV-eYHkrhD4NQcAYnUzsOp2OLAfxp57en0L5Tdz" // آدرس والت Tonkeeper خودت رو اینجا بذار
  const amountInTon = 0.2 // مقدار مالیات به TON
  const amountInNano = amountInTon * 2000000000 // تبدیل TON به نانو (nanotons)
  const paymentMessage =  "Daily Tax Payment" // پیام تراکنش

  // لینک پرداخت Tonkeeper با مقدار نانو
  const tonkeeperPaymentUrl = `https://app.tonkeeper.com/transfer/${tonkeeperWallet}?amount=${amountInNano}&text=${encodeURIComponent(paymentMessage)}`

  return (
    <div className="nft-page text-center pt-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-10 rounded-lg shadow-2xl relative overflow-hidden">
      {/* ضرب قرمز کلفت روی کادر */}
      <div className="absolute top-0 left-0 right-0 bottom-0 border-8 border-gray-600"></div>

      {/* محو کردن محتویات */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg"></div>
      https://s6.uupload.ir/files/r_(3)_3lo.png
      {/* تصویر وسط کادر  https://s6.uupload.ir/files/r_(3)_3lo.png عکس اضافی */}
      <img 
        src="https://s6.uupload.ir/files/r_(1)_4yph.png" // آدرس تصویر خودت رو اینجا بذار
        alt="وسط کادر"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />

      <h1 className="text-4xl font-semibold text-white mb-6">NFT Payment Page</h1>
      <p className="text-xl text-white mb-4">Please make a payment of {amountInTon} TON.</p>
      <p className="text-lg text-gray-300 mb-6">{paymentMessage}</p>
      
      {/* دکمه‌ها غیر فعال هستند */}
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-teal-600 transition-all duration-300 cursor-not-allowed"
        aria-disabled="true"
      >
        Pay with Tonkeeper
      </a>
    </div>
  )
}

export default NFTPage
