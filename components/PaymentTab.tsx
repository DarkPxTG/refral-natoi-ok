'use client'

import React from 'react'

const NFTPage = () => {
    const tonkeeperWallet = "UQBEhJ5tKuV-eYHkrhD4NQcAYnUzsOp2OLAfxp57en0L5Tdz" // آدرس والت Tonkeeper خودت رو اینجا بذار
    const amountInTon = 0.1 // مقدار مالیات به TON
    const amountInNano = amountInTon * 1000000000 // تبدیل TON به نانو (nanotons)
    const paymentMessage = "NFT Tax Payment" // پیام تراکنش

    // لینک پرداخت Tonkeeper با مقدار نانو
    const tonkeeperPaymentUrl = `https://app.tonkeeper.com/transfer/${tonkeeperWallet}?amount=${amountInNano}&text=${encodeURIComponent(paymentMessage)}`

    return (
        <div className="nft-page text-center pt-6">
            <h2 className="text-xl font-bold">Payment Tax</h2>
            <div className="mt-6 p-4 bg-gray-700 text-white rounded-lg">
    You can receive 15K coins daily
</div>

    
            <a
                href={tonkeeperPaymentUrl} 
                className="bg-blue-500 text-white px-6 py-2 rounded-full mt-6 inline-block"
                target="_blank"
                rel="noopener noreferrer"
            >
                Pay Now
            </a>
        </div>
    )
}

export default NFTPage
