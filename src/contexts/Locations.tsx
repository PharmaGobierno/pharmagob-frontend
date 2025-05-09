import { createContext, ReactNode, useEffect, useState } from "react"

type LocationProviderProps = {
    children: ReactNode
}

type Location = {
    [key: string]: {
        colonia: string,
        estado: string,
        cp: string
    }
}

type LocationContext = {
    findByCP: Function
}

export const LocationContext = createContext<LocationContext | null>(null)

export const LocationProvider = ({children}: LocationProviderProps) => {
    const [locations, setLocations] = useState<Location>({})

    const loadData = () => {
        let _locations = JSON.parse(localStorage.getItem("traxion-locations") || "null")
        if(!_locations) {
            _locations = import("../assets/data/codigos-postales.json")
            localStorage.setItem("traxion-locations", JSON.stringify(_locations))
        }
        
        setLocations(_locations)
    }

    const findByCP = (cp: string) => {
        return locations[cp]
    }

    useEffect(() => {
        loadData()
    }, [])

    return(
        <LocationContext.Provider value={{findByCP}}>
            {children}
        </LocationContext.Provider>
    )
}
