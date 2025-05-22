import { ethers } from "ethers"
import { useNavigate } from "react-router-dom"
import useStorage from "../hooks/useStorage.tsx"

const Login = () => {
    const { setAddress } = useStorage()
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
            setAddress(signer.address)
            navigate("/generate-link")
        }
    }

    return (
        <div>
            <div className="flex flex-col items-center">
                <h2 className="text-4xl m-4 font-bol text-white">CryptoBrew - DApp</h2>

                <p className="text-white text-justify my-4">
                    CryptoBrew is a decentralized application (dApp) built using Web3
                    concepts, enabling users to support creators with simple payments. By using Ethereum smart contracts, 
                    CafeBrew allows creators to generate a unique payment link, making it easy for supporters to send secure and transparent 
                    microtransactions directly to the creator’s wallet.
                </p>

                <button type="button" onClick={initializeProvider}
                    className="w-full py-3 bg-[#EED8BF] text-black font-semibold rounded-md cursor-pointer focus:outline-none">
                        Connect Your Wallet
                </button>
            </div>
        </div>
    )
}

export default Login