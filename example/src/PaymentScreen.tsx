import { Input, Switch, Text, Button } from '@rneui/themed';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useFenige, Config } from 'react-native-fenige-sdk';
import uuid from 'react-native-uuid';

const PaymentScreen = () => {
  const { initPayment } = useFenige();

  const [apiKey, setApiKey] = useState('');
  const [amount, setAmount] = useState('');
  const [currencyCode, setCurrency] = useState('');
  const [description, setDescription] = useState('');
  const [autoClear, setAutoClear] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);

  const onFinishCallback = (transactionId: string) => {
    console.log('callback transactionId:', transactionId);
  };

  const initFenigePayment = () => {
    const merchantUrl = 'https://paytool-dev.fenige.pl/demo/';
    const orderNumber = '1';
    const formLanguage = 'en';
    const redirectUrl = {
      successUrl: 'https://paytool-dev.fenige.pl/demo/?success=1',
      failureUrl: 'https://paytool-dev.fenige.pl/demo/?success=0',
    };
    const sender = {
      firstName: 'Test',
      lastName: 'Testowy',
      address: {
        countryCode: 'PL',
        city: 'Testowo',
        postalCode: '12-345',
        street: 'Testowa',
        houseNumber: '1',
      },
    };
    const transactionId = uuid.v4().toString();
    const config: Config = Config.DEBUG;

    initPayment(
      apiKey,
      currencyCode,
      Number(amount),
      description,
      merchantUrl,
      orderNumber,
      formLanguage,
      redirectUrl,
      sender,
      transactionId,
      autoClear,
      isRecurring,
      config,
      onFinishCallback
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text h3 style={styles.title}>
        Fenige SDK Demo
      </Text>
      <Input
        label="Api key"
        placeholder="a4165ee9-е197-4e8e-a830-a5d6432fbf2f"
        onChangeText={setApiKey}
      />
      <Input
        label="Amount (cents)"
        placeholder="1000"
        keyboardType="numeric"
        onChangeText={setAmount}
      />
      <Input
        label="Currency code"
        placeholder="USD"
        onChangeText={setCurrency}
      />
      <Input
        label="Payment description"
        placeholder="Test transaction"
        onChangeText={setDescription}
      />
      <View style={styles.switchesContainer}>
        <View style={styles.switchContainer}>
          <Text>Auto clear</Text>
          <Switch value={autoClear} onValueChange={setAutoClear} />
        </View>
        <View style={styles.switchContainer}>
          <Text>Is recurring</Text>
          <Switch value={isRecurring} onValueChange={setIsRecurring} />
        </View>
      </View>
      <Button
        title="Create payment"
        radius="md"
        style={styles.button}
        onPress={initFenigePayment}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    marginVertical: 20,
    textAlign: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  switchesContainer: {
    gap: 10,
    marginLeft: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default PaymentScreen;
