import React from 'react';
import { fetchUtils, Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import dataProvider from './dataProvider';
import { SchoolList, SchoolEdit, SchoolCreate } from './School';
import { UsersList, UsersEdit, UsersCreate } from './User';
import { ILList, ILEdit, ILCreate } from './IntervisitationLog';
import { CoachlogList, CoachlogEdit, CoachlogCreate } from './Coachlog';

import FilteredResults from './FilteredResults.jsx'
import UserIcon from '@material-ui/icons/Group';

import postgrestClient from 'aor-postgrest-client';

const Controller = () => <Admin dashboard={FilteredResults} dataProvider={dataProvider} >
                          <Resource name="coach_logs" list={CoachlogList} edit={CoachlogEdit} create={CoachlogCreate} />
                          <Resource name="intervisitation_logs" list={ILList} edit={ILEdit} create={ILCreate} />
                          <Resource name="coaches" list={UsersList} edit={UsersEdit} create={UsersCreate} />
                         </Admin>;

export default Controller;
