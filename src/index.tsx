import { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { WebView, type WebViewNavigation } from 'react-native-webview';
import { Config, type RedirectUrl } from './types';
import { FenigeContext } from './contexts/fenigeContext';
import { transactionDevUrl, transactionUrl } from './constants';

export type { RedirectUrl, Sender } from './types';
export { Config } from './types';
export { useFenige } from './hooks/useFenige';

interface Props {
  children: React.ReactElement | React.ReactElement[];
}

export const FenigeProvider = ({ children }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string | undefined>();
  const [config, setConfig] = useState<Config | undefined>();
  const [uri, setUri] = useState<string | undefined>();
  const [redirectUrl, setRedirectUrl] = useState<RedirectUrl | undefined>();
  const [finishCallback, setFinishCallback] =
    useState<(transactionId: string) => void | undefined>();

  useEffect(() => {
    if (visible && transactionId && config) {
      const result = getUri();

      setUri(result);
    }
  }, [transactionId, config, visible]);

  const getUri = () => {
    const url = config === Config.PROD ? transactionUrl : transactionDevUrl;
    const uri = url + transactionId;

    return uri;
  };

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    const { url, loading } = navState;

    if (
      !loading &&
      redirectUrl &&
      transactionId &&
      finishCallback &&
      (url === redirectUrl.failureUrl || url === redirectUrl.successUrl)
    ) {
      handleCloseView();
    }
  };

  const handleCloseView = () => {
    setVisible(false);

    if (finishCallback && transactionId) {
      finishCallback(transactionId);
    }
  };

  return (
    <FenigeContext.Provider
      value={{
        modalVisible: visible,
        transactionId,
        config,
        setModalVisible: setVisible,
        setTransactionId,
        setConfig,
        setRedirectUrl,
        setFinishCallback,
      }}
    >
      {children}
      <Modal visible={visible}>
        {uri && (
          <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={handleCloseView}>
                <Image
                  source={require('../src/assets/close.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
            <WebView
              source={{ uri }}
              style={styles.container}
              onNavigationStateChange={handleNavigationStateChange}
            />
          </SafeAreaView>
        )}
      </Modal>
    </FenigeContext.Provider>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingRight: 10,
    marginBottom: 5,
    alignItems: 'flex-end',
  },
  container: {
    flex: 1,
  },
  image: {
    width: 30,
    height: 30,
  },
});
