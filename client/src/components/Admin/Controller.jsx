import React from 'react';
import { fetchUtils, Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import dataProvider from './dataProvider';
import MyLogoutButton from './MyLogoutButton';
import { SchoolList, SchoolEdit, SchoolCreate } from './School';
import { UsersList, UsersEdit, UsersCreate } from './User';
import { ILList, ILEdit, ILCreate } from './IntervisitationLog';
import { CoachlogList, CoachlogEdit, CoachlogCreate } from './Coachlog';

import FilteredResults from './FilteredResults.jsx'
import UserIcon from '@material-ui/icons/Group';

const Controller = () => <Admin dashboard={FilteredResults} dataProvider={dataProvider} logoutButton={MyLogoutButton}>
                          <Resource name="coach_logs" list={CoachlogList} edit={CoachlogEdit} create={CoachlogCreate} />
                          <Resource name="intervisitation_logs" list={ILList} edit={ILEdit} create={ILCreate} />
                          <Resource name="coaches" icon={UserIcon} list={UsersList} edit={UsersEdit} create={UsersCreate} />
                          <Resource name="schools" list={SchoolList} edit={SchoolEdit} create={SchoolCreate} />
                         </Admin>;

export default Controller;
