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
import Project from '../containers/Project';
import ProjectDetail from '../containers/Project/Detail';
import CreateProjectRole from '../containers/Project/Detail/ProjectRole/actions/Create';
import Role from '../containers/Role';
import RoleDetail from '../containers/Role/Detail';
import RoleCreate from '../containers/Role/actions/Create';
import User from '../containers/User';
import UserDetail from '../containers/User/Detail';

const PATH = '/access';
export default [
  {
    path: PATH,
    component: BaseLayout,
    routes: [
      { path: `${PATH}/user-admin`, component: User, exact: true },
      { path: `${PATH}/user-admin/:id`, component: UserDetail, exact: true },
      { path: `${PATH}/role-admin`, component: Role, exact: true },
      { path: `${PATH}/role-admin/create`, component: RoleCreate, exact: true },
      { path: `${PATH}/role-admin/:id`, component: RoleDetail, exact: true },
      { path: `${PATH}/projects-admin`, component: Project, exact: true },
      {
        path: `${PATH}/projects-admin/:id`,
        component: ProjectDetail,
        exact: true,
      },
      {
        path: `${PATH}/projects-admin/role-create/:id`,
        component: CreateProjectRole,
        exact: true,
      },
      { path: '*', component: E404 },
    ],
  },
];
