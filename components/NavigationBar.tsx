'use client'

import { useTab } from '@/contexts/TabContext'
import Earn from '@/icons/Earn'
import Friends from '@/icons/Friends'
import Home from '@/icons/Home'
import Leaderboard from '@/icons/Leaderboard'
import NFTIcon from '@/icons/Home' // فرض کنید یک آیکون برای NFT داریم
import { TabType } from '@/utils/types'

const NavigationBar = () => {
    const { activeTab, setActiveTab } = useTab()

    const tabs: { id: TabType; label: string; Icon: React.FC<{ className?: string }> }[] = [
        { id: 'home', label: 'Home', Icon: Home },
        { id: 'Payment', label: 'Payment', Icon: Leaderboard },
        { id: 'friends', label: 'Friends', Icon: Friends },
        { id: 'earn', label: 'Earn', Icon: Earn },
    ]

    return (
        <div className="flex justify-center w-full">
            <div className="fixed bottom-0 bg-black border-t border-gray-800 w-full max-w-md">
                <div className="flex justify-between px-4 py-4"> {/* تغییر py-2 به py-4 */}
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex flex-col items-center`}
                            >
                                <tab.Icon
                                    className={`w-12 h-12 ${isActive ? 'text-[#4c9ce2]' : 'text-[#727272]'}
                                        `}
                                />
                                <span
                                    className={`text-sm font-medium ${isActive ? 'text-[#4c9ce2]' : 'text-[#727272]'}
                                        `}
                                >
                                    {tab.label}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default NavigationBar
