import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";

const Index = () => {
  const [showInput, setShowInput] = useState(false);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);

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
    <ImageBackground
      source={require("../assets/images/night2.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <View style={{ flex: 1, paddingTop: 60 }}>
        <ScrollView contentContainerStyle={style.scrollContent}>
          <View style={style.container}>
            {!showInput ? (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => setShowInput(true)}
              >
                <Icon name="search" size={24} color={"#fff"} />
              </TouchableOpacity>
            ) : (
              <TextInput
                style={style.textInput}
                placeholder="Cari lokasi..."
                placeholderTextColor="#888"
                autoFocus={true}
                keyboardType="web-search"
                value={location}
                onChangeText={setLocation}
                onSubmitEditing={getWeather}
                onBlur={() => setShowInput(false)}
              />
            )}
          </View>

          {weather && weather.main && (
            <View style={{ marginTop: 30 }}>
              <Text style={style.resultText}>{weather.name}</Text>
              <Text style={style.resultText}>{weather.sys.country}</Text>
              <Text style={style.resultText}>
                Suhu: {weather.main.temp}°C
              </Text>
              <Text style={style.resultText}>
                Cuaca: {weather.weather[0].description}
              </Text>
              <Text style={style.resultText}>
                Temperatur Min: {weather.main.temp_min}°C
              </Text>
              <Text style={style.resultText}>
                Temperatur Max: {weather.main.temp_max}°C
              </Text>
              <Text style={style.resultText}>
                Kecepatan angin: {weather.wind.speed} m/s
              </Text>
              <Text style={style.resultText}>
                Clouds: {weather.clouds.all}%
              </Text>
              <Text style={style.resultText}>
                Koordinat: [{weather.coord.lat}, {weather.coord.lon}]
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Index;

const style = StyleSheet.create({
  scrollContent: {
    padding: 20,
  },
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
    color: "#000",
  },
  resultText: {
    color: "#fff",
    fontSize: 18,
    marginVertical: 4,
  },
});
