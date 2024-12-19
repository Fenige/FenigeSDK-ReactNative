import { FenigeProvider } from 'react-native-fenige-sdk';
import PaymentScreen from './PaymentScreen';

export default function App() {
  return (
    <FenigeProvider>
      <PaymentScreen />
    </FenigeProvider>
  );
}
