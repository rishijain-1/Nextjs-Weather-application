export async function fetchWeatherAlert(city: string, state: string, country: string){
    try{
        const response = await fetch(`https://cjxiaojia.com/api/alert`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                city,
                state,
                country,
            }),
        })

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json();

        return data.current.condition;

    }catch(error){
        console.error("Error fetching data:", error);
        throw error;
    }
}