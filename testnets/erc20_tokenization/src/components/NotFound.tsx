import { useNavigate } from "react-router-dom"

const NotFound: React.FC = () => {
    const navigate = useNavigate()

   return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white px-4">
            <h1 className="text-7xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-2">Page Not Found</p>
            <p 
             className="text-gray-400 mb-6 text-center max-w-md"
            >The page you're looking for doesn't exist or has been moved.</p>
            <button
             onClick={() => navigate("/home")}
             className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
            >Go Home</button>
        </div>
    )
}

export default NotFound