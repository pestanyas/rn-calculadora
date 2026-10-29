import { StyleSheet, Text, Pressable } from "react-native";

export function Boton({ texto, onPress, tipo, botonDoble = false }) {
  return (

    <Pressable onPress={onPress} style={[styles.botonBase, styles[tipo], botonDoble ? { width: 82 * 2 + 16 } : { width: 82 }]}>
      <Text style={[styles.texto, tipo === "especial" && styles.textoOscuro]}>{texto}</Text>
    </Pressable>

  );
}

const styles = StyleSheet.create({
  botonBase: {
    width: 82,
    height: 82,
    borderRadius: 46,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8
  },
  numero: {
    backgroundColor: '#333333'
  },
  operador: {
    backgroundColor: '#ff9f0a'
  },
  especial: {
    backgroundColor: '#a5a5a5'
  },
  texto: {
    fontSize: 30,
    color: '#ffffff'
  },
  textoOscuro: {
    color: '#000000'
  }
})