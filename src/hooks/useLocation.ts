import { useContext } from "react"
import { LocationContext } from "../contexts/Locations"

const useLocation = () => {
    const context = useContext(LocationContext)

    if (!context) throw new Error('context must be use inside provider');

    return context;
}

export default useLocation