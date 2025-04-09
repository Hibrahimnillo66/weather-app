export const weatherMock = {
    // ...existing data...
    forecast: {
      forecastday: [
        {
          date: "2019-09-07",
          date_epoch: 1567814400,
          astro: {
            sunrise: "06:28 AM",
            sunset: "07:19 PM",
            moonrise: "03:33 PM",
            moonset: "12:17 AM",
            moon_phase: "First Quarter",
            moon_illumination: 54,
          },
          mintemp: 17,
          maxtemp: 25,
          avgtemp: 21,
          totalsnow: 0,
          sunhour: 10.3,
          uv_index: 5,
          hourly: [
            {
              time: "0",
              temperature: 18,
              wind_speed: 28,
              wind_degree: 15,
              wind_dir: "NNE",
              weather_code: 122,
              weather_icons: [
                "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png",
              ],
              weather_descriptions: ["Overcast"],
              precip: 0,
              humidity: 68,
              visibility: 10,
              pressure: 1008,
              cloudcover: 75,
              feelslike: 18,
              uv_index: 0,
            },
          ],
        },
        {
          date: "2019-09-08",
          date_epoch: 1567900800,
          astro: {
            sunrise: "06:29 AM",
            sunset: "07:18 PM",
            moonrise: "04:33 PM",
            moonset: "01:17 AM",
            moon_phase: "First Quarter",
            moon_illumination: 60,
          },
          mintemp: 16,
          maxtemp: 24,
          avgtemp: 20,
          totalsnow: 0,
          sunhour: 9.5,
          uv_index: 4,
          hourly: [
            {
              time: "0",
              temperature: 17,
              wind_speed: 20,
              wind_degree: 10,
              wind_dir: "N",
              weather_code: 113,
              weather_icons: [
                "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png",
              ],
              weather_descriptions: ["Clear"],
              precip: 0,
              humidity: 65,
              visibility: 10,
              pressure: 1012,
              cloudcover: 10,
              feelslike: 17,
              uv_index: 0,
            },
          ],
        },
        // Add 12 more days
        ...Array.from({ length: 12 }, (_, i) => {
          const date = new Date(2019, 8, 9 + i); // Start from 2019-09-09
          return {
            date: date.toISOString().split("T")[0],
            date_epoch: Math.floor(date.getTime() / 1000),
            astro: {
              sunrise: "06:30 AM",
              sunset: "07:15 PM",
              moonrise: "05:00 PM",
              moonset: "02:00 AM",
              moon_phase: "Waxing Crescent",
              moon_illumination: 70,
            },
            mintemp: 15 + i % 3, // Varying temperatures
            maxtemp: 23 + i % 4,
            avgtemp: 19 + i % 2,
            totalsnow: 0,
            sunhour: 8 + i % 3,
            uv_index: 4 + (i % 2),
            hourly: [
              {
                time: "0",
                temperature: 16 + i % 3,
                wind_speed: 15 + i % 5,
                wind_degree: 20 + i % 10,
                wind_dir: "NE",
                weather_code: 113,
                weather_icons: [
                  "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png",
                ],
                weather_descriptions: ["Clear"],
                precip: 0,
                humidity: 60 + i % 5,
                visibility: 10,
                pressure: 1010 + i % 3,
                cloudcover: 5 + i % 10,
                feelslike: 16 + i % 3,
                uv_index: 0,
              },
            ],
          };
        }),
      ],
    },
  };