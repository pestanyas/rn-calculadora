import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Boton } from "./components/Boton.js"

export default function App() {
  const [numeroActual, setNumeroActual] = useState('0');
  const manejarNumero = (digito) => {
    if (digito === '.' && numeroActual.includes('.')) return;

    if (esperandoSegundoNumero) {
      // Empieza a teclear el segundo número
      setNumeroActual(digito);
      setEsperandoSegundoNumero(false);
    } else if (numeroActual === '0' && digito !== '.') {
      setNumeroActual(digito);
    } else {
      setNumeroActual(numeroActual + digito);
    }
  };
  const limpiar = () => {
    setNumeroActual('0');
    setNumeroAnterior(null);
    setOperacion(null);
  };
  const borrarUltimo = () => {
    if (numeroActual.length > 1) {
      setNumeroActual(numeroActual.slice(0, -1));
    } else {
      setNumeroActual('0');
    }
  };
  const cambiarSigno = () => {
    setNumeroActual((parseFloat(numeroActual) * -1).toString());
  };

  const [numeroAnterior, setNumeroAnterior] = useState(null);
  const [operacion, setOperacion] = useState(null);
  const [esperandoSegundoNumero, setEsperandoSegundoNumero] = useState(false);
  const manejarOperacion = (op) => {
    setNumeroAnterior(numeroActual);
    setOperacion(op);
    setEsperandoSegundoNumero(true);
  };

  const calcular = (num1, num2, op) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    switch (op) {
      case '+': return (n1 + n2).toString();
      case '-': return (n1 - n2).toString();
      case '×': return (n1 * n2).toString();
      case '÷': return n2 !== 0 ? (n1 / n2).toString() : 'Error';
      default: return '0';
    }
  };

  const obtenerExpresion = () => {
    if (numeroAnterior && operacion) {
      if (esperandoSegundoNumero) {
        return `${numeroAnterior} ${operacion}`;
      }
      return `${numeroAnterior} ${operacion} ${numeroActual}`;
    }
    return numeroActual;
  };

  const obtenerPreview = () => {
    if (numeroAnterior && operacion && !esperandoSegundoNumero) {
      return calcular(numeroAnterior, numeroActual, operacion);
    }
    return '';
  };

  const manejarIgual = () => {
    if (numeroAnterior && operacion && !esperandoSegundoNumero) {
      const resultado = calcular(numeroAnterior, numeroActual, operacion);
      setNumeroActual(resultado);
      setNumeroAnterior(null);
      setOperacion(null);
      setEsperandoSegundoNumero(false);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.pantallaContainer}>
        <Text style={styles.textoResultado}>{obtenerExpresion()}</Text>
        <Text style={styles.textoPreview}>{obtenerPreview()}</Text>
      </View>

      <View style={styles.fila}>
        <Boton texto="C" tipo="especial" onPress={limpiar} />
        <Boton texto="+/-" tipo="especial" onPress={cambiarSigno} />
        <Boton texto="del" tipo="especial" onPress={borrarUltimo} />
        <Boton texto="÷" tipo="operador" onPress={() => manejarOperacion('÷')} />
      </View>
      <View style={styles.fila}>
        <Boton texto="7" tipo="numero" onPress={() => manejarNumero('7')} />
        <Boton texto="8" tipo="numero" onPress={() => manejarNumero('8')} />
        <Boton texto="9" tipo="numero" onPress={() => manejarNumero('9')} />
        <Boton texto="×" tipo="operador" onPress={() => manejarOperacion('×')} />
      </View>
      <View style={styles.fila}>
        <Boton texto="4" tipo="numero" onPress={() => manejarNumero('4')} />
        <Boton texto="5" tipo="numero" onPress={() => manejarNumero('5')} />
        <Boton texto="6" tipo="numero" onPress={() => manejarNumero('6')} />
        <Boton texto="-" tipo="operador" onPress={() => manejarOperacion('-')} />
      </View>
      <View style={styles.fila}>
        <Boton texto="1" tipo="numero" onPress={() => manejarNumero('1')} />
        <Boton texto="2" tipo="numero" onPress={() => manejarNumero('2')} />
        <Boton texto="3" tipo="numero" onPress={() => manejarNumero('3')} />
        <Boton texto="+" tipo="operador" onPress={() => manejarOperacion('+')} />
      </View>
      <View style={styles.fila}>
        <Boton texto="0" tipo="numero" onPress={() => manejarNumero('0')} botonDoble={true} />
        <Boton texto="." tipo="numero" onPress={() => manejarNumero('.')} />
        <Boton texto="=" tipo="operador" onPress={manejarIgual} />
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'flex-end',
    paddingBottom: 25,
  },
  pantallaContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    paddingBottom: 20,
    width: '100%',
  },
  textoPreview: {
    color: '#888888',
    fontSize: 30,
    marginBottom: 5,
  },
  textoResultado: {
    color: '#ffffff',
    fontSize: 70,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginBottom: 10,
    width: '100%'
  }

});
