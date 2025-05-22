import { ethers } from "ethers"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { useContext } from "react"

const Login: React.FC = () => {
    const { setAddress } = useContext(UserContext)

    const navigate = useNavigate()

    const initializeProvider = async () => {
        let signer
        let provider

        if((window as any).ethereum == null){
            console.log("Metamask not installed ; using read-only defaults")
            provider = ethers.getDefaultProvider()
        } else{
            provider = new ethers.BrowserProvider((window as any).ethereum)
            signer = await provider.getSigner()

            const address = await signer.getAddress()
            setAddress(address)

            navigate("/home")
        }
    }

    return (
        <div>
            <div className="flex flex-col items-center bg-gray-400 h-screen">
                <h2 className="text-4xl m-4 font-bol text-white">ERC20 tokens Dapp</h2>

                <p className="text-white text-justify m-4">
                    A web3 application to manage user's fungible tokens,
                    exchange/swap tokens and view tokens balances
                </p>

                <button type="button" onClick={initializeProvider}
                    className="text-white font-semibold rounded-md cursor-pointer p-3 bg-gray-500 hover:bg-gray-600 transition duration-300">
                        Connect Your Wallet, and start journey
                </button>
            </div>
        </div>
    )
}

export default Login