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
import { Input, Form } from 'antd';
import { nameValidate, nameMessage } from 'utils/validate';

export default function NameInput(props) {
  const {
    componentProps,
    formItemProps: { rules, ...rest },
  } = props;

  const getRules = () => {
    let newRules = {
      validator: (rule, value) =>
        nameValidate(rule, value, componentProps.maxLength),
    };
    if (rules && rules.length > 0) {
      newRules = {
        ...newRules,
        ...rules[0],
      };
    }
    return [newRules];
  };

  const _props = {
    ...componentProps,
    placeholder: t('Please input name'),
  };

  const newFormItemProps = {
    ...rest,
    rules: getRules(),
    extra: nameMessage(componentProps.maxLength),
  };

  return (
    <Form.Item {...newFormItemProps}>
      <Input {..._props} />
    </Form.Item>
  );
}

NameInput.isFormItem = true;
