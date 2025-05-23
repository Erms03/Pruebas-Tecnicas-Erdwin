import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = () => {
  const [location, setLocation] = useState<null | Location.LocationObject>(
    null
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [region, setRegion] = useState({
    latitude: 23.1136, // La Habana, Cuba
    longitude: -82.3666,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Verificar permisos
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permiso de ubicación denegado");
          setIsLoading(false);
          return;
        }

        // Obtener ubicación actual
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setLocation(location);
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      } catch (error) {
        setErrorMsg("No se pudo obtener la ubicación");
        console.error("Error de ubicación:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#3F51B5" />
          <Text style={styles.loadingText}>Buscando tu ubicación...</Text>
        </View>
      );
    }

    if (errorMsg) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorText}>⚠️ {errorMsg}</Text>
          <Text style={styles.subText}>Usando ubicación predeterminada</Text>
        </View>
      );
    }

    return (
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        toolbarEnabled={true}
      >
        <Marker
          coordinate={{
            latitude: location?.coords.latitude || region.latitude,
            longitude: location?.coords.longitude || region.longitude,
          }}
          title="Tu ubicación"
          description="Estás aquí"
          pinColor="#3F51B5"
        />
      </MapView>
    );
  };

  return <View style={styles.container}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  map: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#555",
    marginTop: 15,
  },
  errorText: {
    fontSize: 18,
    color: "#FF3D00",
    marginTop: 15,
    textAlign: "center",
    fontWeight: "500",
  },
  subText: {
    fontSize: 14,
    color: "#777",
    marginTop: 10,
  },
});

export default MapScreen;
