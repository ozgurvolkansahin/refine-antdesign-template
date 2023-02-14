import {
  AntdLayout,
  Avatar,
  Button,
  Dropdown,
  Icons,
  Menu,
  Space,
  Typography
} from '@pankod/refine-antd';
import { useGetIdentity, useGetLocale, useSetLocale } from '@pankod/refine-core';
import { type User } from 'interface/user.interface';
import React from 'react';
import { useTranslation } from 'react-i18next';

const { DownOutlined } = Icons;
const { Text } = Typography;

export const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();
  const { data: user } = useGetIdentity<User>();

  const currentLocale = locale();

  const menu = (
    <Menu selectedKeys={currentLocale != null ? [currentLocale] : []}>
      {[...(i18n.languages ?? [])].sort().map((lang: string) => (
        <Menu.Item
          key={lang}
          onClick={() => changeLanguage(lang)}
          icon={
            <span style={{ marginRight: 8 }}>
              <Avatar size={16} src={`/images/flags/${lang}.svg`} />
            </span>
          }>
          {lang === 'en' ? 'English' : 'German'}
        </Menu.Item>
      ))}
    </Menu>
  );

  const NameAvatarComponent = () => {
    if (user === undefined) return null;
    return (
      <>
        <Text ellipsis strong>
          {user?.name}
        </Text>
        <Avatar src={user?.avatar} alt={user?.name} />
      </>
    );
  };

  return (
    <AntdLayout.Header
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '0px 24px',
        height: '64px'
      }}>
      <Dropdown overlay={menu}>
        <Button type="link">
          <Space>
            <Avatar size={16} src={`/images/flags/${currentLocale ?? ''}.svg`} />
            {currentLocale === 'en' ? 'English' : 'German'}
            <DownOutlined />
            {NameAvatarComponent()}
          </Space>
        </Button>
      </Dropdown>
      <Space style={{ marginLeft: '8px' }}></Space>
    </AntdLayout.Header>
  );
};
