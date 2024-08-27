// api/fetchForecastWeather.ts
export async function fetchForecastWeather(city: string, state: string, country: string) {
    try {
        const response = await fetch(`http://165.22.215.22/api/forecast`, {
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
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
