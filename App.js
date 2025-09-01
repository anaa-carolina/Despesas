import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [receita, setReceita] = useState('');
  const [despesa, setDespesa] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [percentual, setPercentual] = useState(null);

  const calcularEconomia = () => {
    const receitaNum = parseFloat(receita);
    const despesaNum = parseFloat(despesa);

    if (isNaN(receitaNum) || isNaN(despesaNum) || receitaNum <= 0) {
      setMensagem('Por favor, insira valores válidos.');
      setPercentual(null);
      return;
    }

    const economia = receitaNum - despesaNum;
    const porcentagem = (economia / receitaNum) * 100;
    setPercentual(porcentagem.toFixed(2));

    if (porcentagem > 15) {
      setMensagem('Invista seu dinheiro');
    } else if (porcentagem >= 10) {
      setMensagem('Vamos investir no próximo mês');
    } else {
      setMensagem('Vamos continuar tentando');
    }
  };

  useEffect(() => {
    document.title = 'Controle de Despesas 💰';
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Despesas</Text>

      <Text style={{ textAlign: 'center', marginBottom: 20 }}>
        Controle de Despesas é um app simples que calcula quanto você economizou no mês com base na sua receita e despesa. Ele mostra o percentual de economia e dá dicas financeiras de acordo com o resultado. Ideal para quem quer melhorar o controle do dinheiro.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Receita do mês"
        keyboardType="numeric"
        value={receita}
        onChangeText={setReceita}
      />

      <TextInput
        style={styles.input}
        placeholder="Despesa do mês"
        keyboardType="numeric"
        value={despesa}
        onChangeText={setDespesa}
      />

      <TouchableOpacity style={styles.botao} onPress={calcularEconomia}>
        <Text style={styles.botaoTexto}>Calcular Economia</Text>
      </TouchableOpacity>

      {percentual !== null && (
        <Text style={styles.result}>
          Você economizou {percentual}% este mês.
        </Text>
      )}

      {mensagem !== '' && (
        <Text style={styles.message}>{mensagem}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  botao: {
    backgroundColor: '#9673f5ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  message: {
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#8359f7ff',
  },
});
