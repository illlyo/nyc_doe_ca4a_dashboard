import React from 'react';
import {Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import { PostList, PostEdit, PostCreate } from './Post';
import { UsersList, UsersEdit, UsersCreate } from './User';
import FilteredResults from './FilteredResults.jsx';
import UserIcon from '@material-ui/icons/Group';

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');

const Controller = () => <Admin dashboard={FilteredResults} dataProvider={dataProvider}>
                          <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
                          <Resource name="users" list={UsersList} icon={UserIcon} edit={PostEdit} create={PostCreate} />
                         </Admin>;

export default Controller;
