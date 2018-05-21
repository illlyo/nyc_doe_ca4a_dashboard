import React from 'react';
import { fetchUtils, Admin, Resource} from 'react-admin';
import dataProvider from './dataProvider';
import simpleRestClient from 'ra-data-simple-rest';

import { SchoolList, SchoolEdit, SchoolCreate } from './School';
import { UsersList, UsersEdit, UsersCreate } from './User';
import { CoachlogList, CoachlogEdit, CoachlogCreate } from './Coachlog';

import FilteredResults from './FilteredResults.jsx'
import UserIcon from '@material-ui/icons/Group';


const Controller = () => <Admin dashboard={FilteredResults} dataProvider={dataProvider} >
                          <Resource name="coach_logs" list={CoachlogList} edit={CoachlogEdit} create={CoachlogCreate} />
                         </Admin>;

export default Controller;
