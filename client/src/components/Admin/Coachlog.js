import React from 'react';
import { List, Datagrid, TextField, ReferenceField, Edit, EditButton, SimpleForm, DisabledInput, ReferenceInput, SelectInput, TextInput, LongTextInput, Create, Filter } from 'react-admin';


export const CoachlogList = (props) => (
    <List {...props} >
        <Datagrid>
            <TextField label="id" source="id" />
            <TextField source="school_visited" />
            <TextField source="objectives_of_visit" />
            <EditButton />
        </Datagrid>
    </List>
);

const CoachlogTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const CoachlogEdit = (props) => (
    <Edit title={<CoachlogTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="school_visited" />
            <LongTextInput source="objectives_of_visit" />
        </SimpleForm>
    </Edit>
);

export const CoachlogCreate = (props) => (
    <Create {...props}>
        <SimpleForm>

            <TextInput source="school_visited" />
            <LongTextInput source="objectives_of_visit" />
        </SimpleForm>
    </Create>
);
