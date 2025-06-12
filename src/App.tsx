import { useEffect } from 'react';
import { BackToTop } from '@/components';
import AppRouter from '@/routes/router';
import { AuthProvider, LayoutProvider, NotificationProvider } from '@/states';
import configureFakeBackend from './helpers/fake-backend';
import { CookiesProvider } from 'react-cookie';

configureFakeBackend();

const App = () => {
  useEffect(() => {
    document.title = 'Zeko';

    // Ensure the title stays "Zeko"
    const observer = new MutationObserver(() => {
      if (document.title !== 'Zeko') {
        document.title = 'Zeko';
      }
    });

    observer.observe(document.querySelector('title')!, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <CookiesProvider>
      <NotificationProvider>
        <LayoutProvider>
          <AuthProvider>
            <AppRouter />
            <BackToTop />
          </AuthProvider>
        </LayoutProvider>
      </NotificationProvider>
    </CookiesProvider>
  );
};

export default App;
