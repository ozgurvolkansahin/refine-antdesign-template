import {
  AuthPage,
  ErrorComponent,
  Layout,
  notificationProvider,
  ReadyPage
} from '@pankod/refine-antd';
import '@pankod/refine-antd/dist/reset.css';
import { Refine } from '@pankod/refine-core';

import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import routerProvider from '@pankod/refine-react-router-v6';
import { Header } from 'components/layout';
import { dataProvider } from 'provider/data-provider';
import { useTranslation } from 'react-i18next';
import { Routes } from 'route/route';
function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: async (lang: string) => await i18n.changeLanguage(lang),
    getLocale: () => i18n.language
  };

  const LoginPage = () => {
    return (
      <AuthPage
        providers={[
          {
            name: 'google',
            label: 'Sign in with Google',
            icon: <GoogleOutlined style={{ fontSize: 24, lineHeight: 0 }} />
          },
          {
            name: 'github',
            label: 'Sign in with GitHub',
            icon: <GithubOutlined style={{ fontSize: 24, lineHeight: 0 }} />
          }
        ]}
      />
    );
  };
  // const authProvider: AuthProvider = {
  //   login: async ({ email, providerName }) => {
  //     if (providerName === 'google') {
  //       window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth';
  //       return Promise.resolve(false);
  //     }

  //     if (providerName === 'github') {
  //       window.location.href = 'https://github.com/login/oauth/authorize';
  //       return Promise.resolve(false);
  //     }

  //     if (email) {
  //       localStorage.setItem('email', email);
  //       return Promise.resolve();
  //     }

  //     return Promise.reject();
  //   },
  //   register: (params) => {
  //     if (params.email && params.password) {
  //       localStorage.setItem('email', params.email);
  //       return Promise.resolve();
  //     }
  //     return Promise.reject();
  //   },
  //   updatePassword: (params) => {
  //     if (params.newPassword) {
  //       //we can update password here
  //       return Promise.resolve();
  //     }
  //     return Promise.reject();
  //   },
  //   forgotPassword: (params) => {
  //     if (params.email) {
  //       //we can send email with forgot password link here
  //       return Promise.resolve();
  //     }
  //     return Promise.reject();
  //   },
  //   logout: () => {
  //     localStorage.removeItem('email');
  //     return Promise.resolve();
  //   },
  //   checkError: () => Promise.resolve(),
  //   checkAuth: () => (localStorage.getItem('email') ? Promise.resolve() : Promise.reject()),
  //   getPermissions: () => Promise.resolve(['admin']),
  //   getUserIdentity: () =>
  //     Promise.resolve({
  //       id: 1,
  //       name: 'Jane Doe',
  //       avatar: 'https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640'
  //     })
  // };
  return (
    <Refine
      // authProvider={authProvider}
      dataProvider={dataProvider()}
      notificationProvider={notificationProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      resources={Routes}
      routerProvider={routerProvider}
      i18nProvider={i18nProvider}
      Header={Header}
      LoginPage={LoginPage}
    />
  );
}

export default App;
