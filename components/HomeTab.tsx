'use client'

import Wallet from '@/icons/Wallet'
import Community from '@/icons/Community'
import Star from '@/icons/Star'
import Image from 'next/image'
import ArrowRight from '@/icons/ArrowRight'
import { useEffect, useState } from 'react'

const HomeTab = () => {
    const [coins, setCoins] = useState(0)
    const [morseInput, setMorseInput] = useState('')
    const [isMorseVisible, setMorseVisible] = useState(false)
    const [usedMorseCodes, setUsedMorseCodes] = useState<string[]>([])
    const [account, setAccount] = useState<string | null>(null) // Account state for wallet

    useEffect(() => {
        const savedCoins = localStorage.getItem('coins')
        if (savedCoins) {
            setCoins(Number(savedCoins))
        }

        const savedUsedMorseCodes = localStorage.getItem('usedMorseCodes')
        if (savedUsedMorseCodes) {
            setUsedMorseCodes(JSON.parse(savedUsedMorseCodes))
        }

        // Retrieve wallet address from localStorage if available
        const savedAccount = localStorage.getItem('account')
        if (savedAccount) {
            setAccount(savedAccount)
        }
    }, [])

    const validMorseCodes = [
        'TREE', 'OCEAN', 'MOUNTAIN', 'SUN', 'MOON', 'STAR', 'CLOUD', 'FIRE', 'WATER', 'WIND',
        'STONE', 'SAND', 'RIVER', 'LAKE', 'FOREST', 'FLOWER', 'GRASS', 'LEAF', 'BIRD', 'FISH',
        'HORSE', 'TIGER', 'LION', 'BEAR', 'WOLF', 'EAGLE', 'SHARK', 'WHALE', 'DOLPHIN', 'SNAKE',
        'TURTLE', 'BUTTERFLY', 'DRAGONFLY', 'SPIDER', 'ANT', 'BEE', 'CAT', 'DOG', 'MOUSE', 'RABBIT',
        'ELEPHANT', 'GIRAFFE', 'ZEBRA', 'MONKEY', 'KANGAROO', 'PENGUIN', 'SEAL', 'FOX', 'DEER', 'BAT'
    ]

    const handleMorseSubmit = () => {
        if (validMorseCodes.includes(morseInput.toUpperCase())) {
            if (usedMorseCodes.includes(morseInput.toUpperCase())) {
                alert('This code has already been used!')
            } else {
                const newCoins = coins + 3000
                setCoins(newCoins)
                setUsedMorseCodes([...usedMorseCodes, morseInput.toUpperCase()])

                localStorage.setItem('coins', newCoins.toString())
                localStorage.setItem('usedMorseCodes', JSON.stringify([...usedMorseCodes, morseInput.toUpperCase()]))

                alert('You gained 3K points!')
            }
        } else {
            alert('Invalid Code! Try again.')
        }

        setMorseInput('')
        setMorseVisible(false)
    }

    const formatCoins = (value: number) => {
        return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value
    }

    const handleConnectWallet = async () => {
        // بررسی اینکه آیا Tonkeeper نصب است
        if (typeof window !== 'undefined' && window.tonkeeper) {
            try {
                // درخواست دسترسی به حساب کاربر از Tonkeeper
                const { accounts } = await window.tonkeeper.request({
                    method: 'ton_requestAccounts',
                })

                // آدرس حساب کاربر را ذخیره کنید
                setAccount(accounts[0])
                localStorage.setItem('account', accounts[0]) // ذخیره آدرس کیف پول در localStorage

                alert('Wallet connected: ' + accounts[0])
            } catch (error) {
                alert('Error connecting wallet: ' + error)
            }
        } else {
            alert('Please install Tonkeeper!')
        }
    }

    const handleMorseToggle = () => {
        setMorseVisible(!isMorseVisible)
    }

    return (
        <div className="home-tab-con transition-all duration-300 relative">
            <button onClick={handleConnectWallet} className="w-full flex justify-center mt-8 relative z-10">
                <div className="bg-[#007aff] text-white px-3 py-1 rounded-full flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    <span>{account ? `Wallet Connected: ${account}` : 'Connect Wallet'}</span>
                </div>
            </button>

            {account && <div>Connected Account: {account}</div>}

            <div className="flex flex-col items-center mt-8 relative z-10">
                <Image
                    src="/images/not.png"
                    alt="Custom Logo"
                    width={112}
                    height={112}
                    className="mb-4"
                />
                <div className="flex items-center gap-1 text-center">
                    <div className="text-6xl font-bold mb-1">{formatCoins(coins)}</div>
                    <div className="text-white text-2xl">NATOI</div>
                </div>
                <div
                    className="flex items-center gap-1 text-[#a19f9f] rounded-full px-4 py-1.5 mt-2 cursor-pointer"
                    onClick={handleMorseToggle}
                >
                    <span>SECRET CODE</span>
                    <ArrowRight className="w-6 h-6" />
                </div>

                {isMorseVisible && (
                    <div className="mt-4 bg-[#1e1e1e] p-4 rounded-lg z-20">
                        <input
                            type="text"
                            value={morseInput}
                            onChange={(e) => setMorseInput(e.target.value)}
                            placeholder="Enter Secret Code"
                            className="w-full p-2 rounded bg-[#2d2d2e] text-white mb-2"
                        />
                        <button
                            onClick={handleMorseSubmit}
                            className="w-full bg-[#007aff] text-white py-1 rounded"
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>

            <div className="space-y-3 px-4 mt-8 mb-8 relative z-10">
                <button className="w-full bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg px-4 py-4 flex items-center justify-between max-w-[900px] mx-auto">
                    <div className="flex items-center gap-3 font-medium">
                        <Community className="w-8 h-8" />
                        <span>Join our Community</span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                </button>

                <button className="w-full bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg px-4 py-4 flex items-center justify-between max-w-[900px] mx-auto">
                    <div className="flex items-center gap-3 font-medium">
                        <Star className="w-8 h-8" />
                        <span>Check your Rewards</span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                </button>
            </div>
        </div>
    )
}

export default HomeTab
