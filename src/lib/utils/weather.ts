interface params {
    type: 'locality' | 'city' | 'loc'
    data: Record<string, string> | string | null
}

export const fetchWeatherData = async (params: params) => {
    let content: Record<string, string> | string = ''

    const response = await fetch(`https://${process.env.BASE_URL}/api/location`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params.data),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data[0];
}

export const fetchForcastWeather= async(params: params)=>{

    const response = await fetch(`https://${process.env.BASE_URL}/api/forecast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params.data),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }  

    const data = await response.json();

    return data[0];
}
export const fetchHistoryWeatherData = async(params:params)=>{
    try {
        const response = await fetch(`https://${process.env.BASE_URL}/api/history`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params.data),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch historical weather data");
        }

        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error("Error fetching historical weather data:", error);
        throw error;
    }
}
export const fetchAlertsWeatherData = async (params: params)=>{
    try{
        const response = await fetch(`https://${process.env.BASE_URL}/api/alert`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params.data),
        })

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json();

        return data;

    }catch(error){
        console.error("Error fetching data:", error);
        throw error;
    }
}