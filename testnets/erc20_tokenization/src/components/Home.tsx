import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { formatAddress } from "../utils/UtilFn.ts"

const Home: React.FC = () => {
    const { address } = useContext(UserContext)
    const [userAddress, setUserAddress] = useState<string | null>(null)

    if(address) setUserAddress(formatAddress(address))
    
   return (
        <>
            <div className='flex justify-center items-center flex-col bg-gray-600 h-screen'>
                <h3 className='text-5xl text-slate-700'>{`You're logged in with your public address ${userAddress}`}</h3>
                <section className='mt-5 ml-28'>
                <label htmlFor="features-list" className="text-2xl mb-4">Now you can access the following features</label>
                <ul className="list-disc pl-7 txt-1xl" id="features-list">
                    <li>Token transfer</li>
                    <li>Token swapping</li>
                    <li>Checking balance</li>
                </ul>
                </section>
            </div>
        </>
    )
}

export default Home