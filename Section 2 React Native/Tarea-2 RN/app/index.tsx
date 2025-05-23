import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [location, setLocation] = useState<null | Location.LocationObject>(
    null
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [region, setRegion] = useState({
    latitude: 19.4326, // Latitud por defecto (Ciudad de México)
    longitude: -99.1332, // Longitud por defecto
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      // Verificar permisos
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permiso de ubicación denegado");
        return;
      }

      // Obtener ubicación actual
      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        setErrorMsg("Error al obtener la ubicación");
        console.error(error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : location ? (
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Mi ubicación"
            description="Aquí estoy ahora"
          />
        </MapView>
      ) : (
        <Text style={styles.loading}>Obteniendo ubicación...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  error: {
    fontSize: 18,
    color: "red",
    padding: 20,
    textAlign: "center",
  },
  loading: {
    fontSize: 18,
    padding: 20,
    textAlign: "center",
  },
});
