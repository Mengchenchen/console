/*
 * Copyright 2021 KubeClipper Authors.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import React, { useContext } from 'react';
import { Menu } from 'antd';
import renderAdminMenu from 'core/admin-menu';
import i18n from 'core/i18n';
import renderMenu from 'core/menu';
import { useDeepCompareEffect, useAdminPage } from 'hooks';
import { isEmpty, has } from 'lodash';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { useRootStore } from 'stores';
import { BaseContext } from '..';
import styles from '../index.less';

const { SubMenu } = Menu;

/**
 * filter menu by permission
 * @returns
 */
const permissionMenu = (isAdminPage) => {
  const menus = isAdminPage ? renderAdminMenu(i18n.t) : renderMenu(i18n.t);
  const navs = [];

  menus.forEach((item) => {
    if (item.children) {
      const filteredChild = item.children.filter((child) =>
        globals.checkMenuItem(child, (params) => globals.hasPermission(params))
      );

      if (!isEmpty(filteredChild)) {
        navs.push({ ...item, children: filteredChild });
      }
    }
  });

  return navs;
};

/**
 *
 * @param {*} path
 * @param {*} targetPath
 * @returns
 */
const checkPath = (path, targetPath) => {
  if (path instanceof RegExp) {
    return path.test(targetPath);
  }
  return path === targetPath;
};

/**
 *
 * @param {*} path
 * @returns
 */
const getCurrentMenu = (path, menuData) => {
  const item = menuData.find((it) => checkPath(it.path, path));

  if (item) {
    return [item];
  }

  for (const detail of menuData) {
    if (detail.children) {
      const current = detail.children.find((it) => checkPath(it.path, path));

      if (current) {
        return [detail, current];
      }

      for (const subDetail of detail.children) {
        if (subDetail.children) {
          const subCurrent = subDetail.children.find((it) =>
            checkPath(it.path, path)
          );
          if (subCurrent) {
            return [detail, subDetail, subCurrent];
          }
        }
      }
    }
  }

  return [];
};

/**
 *
 * @param {*} currentRoutes
 * @returns
 */
const getSelectedKeys = (currentRoutes) => {
  if (currentRoutes.length === 0) {
    return [];
  }
  if (currentRoutes.length === 1) {
    return [currentRoutes[0].key];
  }
  if (currentRoutes.length >= 2) {
    if (has(currentRoutes[0], 'level') && currentRoutes[0].level === 1) {
      return [currentRoutes[0].key];
    }

    return [currentRoutes[1].key];
  }
  return [];
};

function Menus() {
  const rootStore = useRootStore();
  const { openKeys: defaultOpenKeys } = rootStore;
  const { state, setState, Routes } = useContext(BaseContext);
  const { collapsed, hover, openKeys, currentRoutes } = state;
  const { pathname } = Routes.location;
  let { isAdminPage } = useAdminPage();

  // 特例：某些路径带 admin 不能正确判断是否管理平台；比如项目管理员的项目角色详情页路径：project/role/xxx-admin;
  if (pathname.indexOf('/project/role') > -1) {
    isAdminPage = false;
  }

  const menuData = permissionMenu(isAdminPage);
  const menus = getCurrentMenu(pathname, menuData);

  useDeepCompareEffect(() => {
    setState({
      ...state,
      currentRoutes: menus,
      openKeys: menus.length ? [menus[0].key] : [],
    });
  }, [menus]);

  const onOpenChange = (openKeysIn) => {
    const latestOpenKey = openKeysIn.find(
      (key) => openKeys.indexOf(key) === -1
    );
    const newKeys = latestOpenKey ? [latestOpenKey] : [];

    rootStore.updateOpenKeys(newKeys);
    setState({ ...state, openKeys: [...newKeys] });
  };

  const renderMenuItem = (item) => {
    const { children, icon, key, name, path, level } = item;

    if (collapsed && !hover) {
      return (
        <Menu.Item key={key} className={styles['menu-item']}>
          {icon}
        </Menu.Item>
      );
    }

    if (level > 1) {
      return null;
    }

    if (!children || children.length === 0 || level) {
      return (
        <Menu.Item key={key} className={styles['menu-item']}>
          {icon}
          <>
            <Link key={key} to={path}>
              {name}
            </Link>
          </>
        </Menu.Item>
      );
    }

    const title = (
      <>
        {icon}
        <span>{name}</span>
      </>
    );

    const subMenuItems = children.map((it) => renderMenuItem(it));

    return (
      <SubMenu key={key} title={title} className={styles['sub-menu']}>
        {subMenuItems}
      </SubMenu>
    );
  };

  const selectedKeys = getSelectedKeys(currentRoutes);
  const newOpenKeys = openKeys.length === 0 ? toJS(defaultOpenKeys) : openKeys;

  const menuItems = menuData
    .map((item) => renderMenuItem(item))
    .filter((it) => it !== null);

  if (!openKeys.length && !currentRoutes.length) return;

  return (
    <Menu
      theme="dark"
      mode="inline"
      className={styles.menu}
      selectedKeys={selectedKeys}
      openKeys={newOpenKeys}
      onOpenChange={onOpenChange}
    >
      {menuItems}
    </Menu>
  );
}

export default observer(Menus);
