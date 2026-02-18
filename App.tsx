import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CameraView, BarcodeScanningResult, useCameraPermissions } from 'expo-camera';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [value, setValue] = useState<string>('');

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text} onPress={requestPermission}>Press to allow camera permission </Text>
      </View>
    );
  }

  const onBarcodeScanned = (result: BarcodeScanningResult) => {
    setValue(result.data);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['ean13', 'ean8'] }}
        onBarcodeScanned={onBarcodeScanned}
      />
      <View style={styles.overlay}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50,
    alignItems: 'center',
  },
  value: { color: '#fff', fontSize: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 18 },
});