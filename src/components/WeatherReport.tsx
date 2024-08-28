import { headers } from 'next/headers'

export default function WeatherReport() {
    const headerList = headers();
    const ip = headerList.get('x-forwarded-for') || ':1'
    let location = '';

    if (['::1', ':1'].includes(ip)) {
        location = 'New Delhi, Delhi, India'
    }

    return (
        <div>
            <div>{location}</div>
            <div>{ip}</div>
        </div>
    )
}