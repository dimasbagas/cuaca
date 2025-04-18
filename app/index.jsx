import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const Index = () => {
  const [showInput, setShowInput] = useState(false);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const getWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=44be9e79396d022e0b9503a4fe80ea26&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeather(data);
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
      });
  };

  return (
    <>
      <ScrollView>
        <View style={{ flex: 1, padding: 20 }}>
          <ImageBackground
            source={(require = "../assets/images/night2.jpg")}
            style={{ flex: 1 }}
          ></ImageBackground>
          <View style={style.container}>
            {!showInput ? (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => setShowInput(true)}
              >
                <Icon name="search" size={24} color={"#000000"} />
              </TouchableOpacity>
            ) : (
              <TextInput
                style={style.textInput}
                placeholder="Cari lokasi..."
                autoFocus={true}
                keyboardType="web-search"
                value={location}
                onChangeText={setLocation}
                onSubmitEditing={getWeather}
                onBlur={() => setShowInput(false)}
              />
            )}
          </View>

          {/* Tampilkan hasil cuaca */}
          {weather && weather.main && (
            <View style={{ marginTop: 30 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {weather.name}
              </Text>
              <Text>{weather.sys.country}</Text>
              <Text>Suhu: {weather.main.temp}°C</Text>
              <Text>Cuaca: {weather.weather[0].description}</Text>
              <Text>Temperatur: {weather.main.temp_min}°C</Text>
              <Text>Temperatur: {weather.main.temp_max}°C</Text>
              <Text>Kecepatan angin: {weather.wind.speed} m/s</Text>
              <Text>Clouds: {weather.clouds.all}%</Text>
              <Text>
                Geo cordinates: [{weather.coord.lat}, {weather.coord.lon}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginTop: 20,
  },
  textInput: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 3,
    flex: 1,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    height: 40,
  },
});

export default Index;
