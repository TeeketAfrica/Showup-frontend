export interface DriverProps{
    id:string,
    email:string,
    first_name:string,
    last_name:string,
    mobile:string,
    role:string,
    is_verified:boolean
}

export interface BusProps{
    driver: DriverProps,
    id: string,
    name: string,
    capacity: number,
    plate_number: string,
    is_active: boolean,
    color: string
    price?: string
    bus_name?: string
    bus_id?: string
}

export interface RouteProps{
    id: string,
    name: string,
    source: string,
    destination: string,
    time_slot: string,
    duration: number
}