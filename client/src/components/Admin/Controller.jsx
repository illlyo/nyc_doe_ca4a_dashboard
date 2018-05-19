import React from 'react';
import {Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import { PostList, PostEdit, PostCreate } from './Post';
import { UsersList, UsersEdit, UsersCreate } from './User';

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');

const Controller = () => <Admin dataProvider={dataProvider}>
                          <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate}/>
                          <Resource name="users" list={UsersList} edit={PostEdit} create={PostCreate} />
                         </Admin>;

export default Controller;
