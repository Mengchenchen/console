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
import E404 from 'components/E404';
import BaseLayout from 'layouts/Base';
import Node from '../containers/Node';
import NodeDetail from '../containers/Node/Detail';


const PATH = '/node';
export default [
  {
    path: PATH,
    component: BaseLayout,
    routes: [
      { path: `${PATH}`, component: Node, exact: true },
      { path: `${PATH}/:id`, component: NodeDetail, exact: true },
      { path: '*', component: E404 },
    ],
  },
  {
    path: `${PATH}-admin`,
    component: BaseLayout,
    routes: [
      { path: `${PATH}-admin`, component: Node, exact: true },
      { path: `${PATH}-admin/:id`, component: NodeDetail, exact: true },
      { path: '*', component: E404 },
    ],
  },
];
