'use client'
import React from 'react'

const NFTPage = () => {
  const tonkeeperWallet = "UQBEhJ5tKuV-eYHkrhD4NQcAYnUzsOp2OLAfxp57en0L5Tdz" // آدرس ولت
  const nftId = "your-nft-id" // آیدی NFT که باید ارسال شود
  const amountInTon = 0.3 // افزایش مقدار مالیات به 0.3
  const amountInNano = amountInTon * 2000000000 // تبدیل TON به نانو (nanotons)
  const paymentMessage = "Daily Tax Payment"

  // لینک پرداخت Tonkeeper با مقدار نانو
  const tonkeeperPaymentUrl = `https://app.tonkeeper.com/transfer/${tonkeeperWallet}?amount=${amountInNano}&text=${encodeURIComponent(paymentMessage)}`

  // تابع ارسال NFT به کاربر
  const sendNFT = async (recipientWallet: string) => {
    try {
      const response = await fetch("https://your-nft-api.com/send", { // این URL باید به API شما که ارسال NFT رو انجام می‌ده متصل باشه
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nftId: nftId,
          senderWallet: tonkeeperWallet,
          recipientWallet: recipientWallet,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Error sending NFT');
      }
      
      console.log("NFT sent successfully!");
    } catch (error) {
      console.error("Failed to send NFT:", error);
    }
  }

  const handlePaymentAndSendNFT = () => {
    // انجام پرداخت با Tonkeeper
    window.open(tonkeeperPaymentUrl, "_blank");
    
    // فرض می‌کنیم آدرس ولت کاربر رو در اختیار داریم
    const recipientWallet = "user-wallet-address"; // این مقدار باید از کاربر گرفته بشه یا شبیه‌سازی بشه
    sendNFT(recipientWallet);
  }

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
      
      {/* دکمه‌ها فعال هستند */}
      <a 
        href="#"
        onClick={handlePaymentAndSendNFT} // اجرای همزمان پرداخت و ارسال NFT
        className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-teal-600 transition-all duration-300"
      >
        Pay with Tonkeeper and Receive NFT
      </a>
    </div>
  )
}

export default NFTPage
