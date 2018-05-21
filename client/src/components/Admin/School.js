import React from 'react';
import { List, Datagrid, TextField, ReferenceField, Edit, EditButton, SimpleForm, DisabledInput, ReferenceInput, SelectInput, TextInput, LongTextInput, Create, Filter } from 'react-admin';

const SchoolFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const SchoolList = (props) => (
    <List {...props} filters={<SchoolFilter />} >
        <Datagrid>
            <TextField label="stuff" source="id" />
            <ReferenceField label="User" source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="title" />
            <TextField source="body" />
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
            <ReferenceInput label="User" source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Edit>
);

export const SchoolCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label="User" source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Create>
);

