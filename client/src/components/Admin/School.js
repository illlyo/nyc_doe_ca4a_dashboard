import React from 'react';
import { List, Datagrid, TextField, ReferenceField, Edit, EditButton, SimpleForm, DisabledInput, ReferenceInput, SelectInput, TextInput, LongTextInput, Create, Filter } from 'react-admin';

const SchoolFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const SchoolList = (props) => (
    <List {...props} filters={<SchoolFilter />} >
        <Datagrid>
            <TextField label="stuff" source="id" />
            <TextField source="location_name" />
            <TextField source="cohort" />
            <TextField source="coach_name" />

            <EditButton />
        </Datagrid>
    </List>
);

const SchoolTitle = ({ record }) => {
    return <span>School {record ? `"${record.title}"` : ''}</span>;
};

export const SchoolEdit = (props) => (
    <Edit title={<SchoolTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="location_name" />
            <TextInput source="cohort" />
            <TextInput source="coach_name" />

        </SimpleForm>
    </Edit>
);

export const SchoolCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="location_name" />
            <TextInput source="cohort" />
            <TextInput source="coach_name" />
        </SimpleForm>
    </Create>
);

