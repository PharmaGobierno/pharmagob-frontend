import { createContext, ReactNode, useEffect, useState } from "react"

type LocationProviderProps = {
    children: ReactNode
}

type Location = {
    [key: string]: {
        [key: string]: {
            [key: string]: string[]
        }
    }
}

type LocationContext = {
    getCPs: Function,
    getEstados: Function,
    getMunicipios: Function,
    getColonias: Function,
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

    const getCPs = () => {
        return Object.keys(locations)
    }

    const getEstados = (cp: string) => {
        return Object.keys(locations[cp])
    }

    const getMunicipios = ({cp, estado}: {cp: string, estado: string}) => {
        return Object.keys(locations[cp][estado])
    }

    const getColonias = ({cp, estado, municipio}: {cp: string, estado: string, municipio: string}) => {
        return locations[cp][estado][municipio]
    }

    useEffect(() => {
        loadData()
    }, [])

    return(
        <LocationContext.Provider value={{getCPs, getEstados, getMunicipios, getColonias}}>
            {children}
        </LocationContext.Provider>
    )
}
