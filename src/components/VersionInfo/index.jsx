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

import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useVersionInfo } from 'hooks';
import styles from './index.less';

const VersionInfo = (props) => {
  const { className } = props;
  const [handleVersionClick, Version] = useVersionInfo();

  return (
    <div>
      <span className={classNames(styles.dropDown, className)}>
        <InfoCircleOutlined onClick={handleVersionClick} />
      </span>
      {Version}
    </div>
  );
};

export default VersionInfo;
