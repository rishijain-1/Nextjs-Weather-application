
export async function fetchHistoryWeather(city: string, state: string, country: string) {
    try {
        const response = await fetch("https://cjxiaojia.com/api/history", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                city,
                state,
                country,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch historical weather data");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching historical weather data:", error);
        throw error;
    }
}
