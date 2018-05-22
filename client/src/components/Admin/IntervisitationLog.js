import React from 'react';
import { List, Datagrid, TextField, DateField, ReferenceField, Edit, EditButton, SimpleForm, DisabledInput, ReferenceInput, SelectInput, TextInput, LongTextInput, Create, Filter } from 'react-admin';


export const ILList = (props) => (
    <List {...props} >
        <Datagrid>
            <TextField label="stuff" source="id" />
            <DateField source="date_visit" />
            <TextField source="coach_name" />
            <TextField source="school" />
            <TextField source="coach_visited" />
            <EditButton />
        </Datagrid>
    </List>
);

const ILlogTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const ILEdit = (props) => (
    <Edit title={<ILlogTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="coach_name" />
            <TextInput source="school" />
            <LongTextInput source="coach_visited" />
        </SimpleForm>
    </Edit>
);

export const ILCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="coach_name" />
            <TextInput source="school" />
            <LongTextInput source="coach_visited" />
        </SimpleForm>
    </Create>
);
