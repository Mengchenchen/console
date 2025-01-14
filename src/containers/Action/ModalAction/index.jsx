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
import BaseForm from 'components/Form';
import { isAdminPage } from 'utils';

export default class ModalAction extends BaseForm {
  static id = 'modalAction';

  static actionType = 'modal';

  static title = t('Edit');

  static buttonType = 'primary';

  static get modalSize() {
    return 'small';
  }

  static get isAdminPage() {
    const { pathname } = window.location;
    return isAdminPage(pathname);
  }

  get name() {
    return t('Edit');
  }

  get isModal() {
    return true;
  }

  get labelCol() {
    return {
      xs: { span: 8 },
      sm: { span: 6 },
    };
  }

  get wrapperCol() {
    return {
      xs: { span: 16 },
      sm: { span: 14 },
    };
  }

  get isAsyncAction() {
    return false;
  }

  static allowed() {
    return Promise.resolve();
  }

  get instanceName() {
    return this.item?.name || this.values?.name;
  }

  get actionName() {
    return this.name.toLowerCase() || this.title;
  }

  get successText() {
    if (this.isAsyncAction) {
      return t(
        'The {name} {action} instruction has been executed. \n You can wait for a few seconds to follow the changes or manually refresh the data to get the final display result.',
        { action: this.actionName, name: this.instanceName }
      );
    }

    return t('{action} {name} successfully.', {
      action: this.actionName,
      name: this.instanceName,
    });
  }

  get errorText() {
    return t('Unable to {action} {name}.', {
      action: this.actionName,
      name: this.instanceName,
    });
  }

  get containerProps() {
    return this.props.containerProps || {};
  }

  get item() {
    const { item } = this.props;

    return item || this.containerProps.detail || { name: '' };
  }

  get defaultValue() {
    const { name = '' } = this.item;
    const value = {
      name,
    };
    return value;
  }

  get formItems() {
    return [
      {
        name: 'name',
        label: t('Name'),
        type: 'input-name',
        required: true,
        placeholder: t('Please input name'),
      },
    ];
  }

  // eslint-disable-next-line no-unused-vars
  onSubmit = (values) => Promise.resolve();
}
