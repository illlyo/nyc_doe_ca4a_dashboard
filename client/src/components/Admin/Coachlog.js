import React from 'react';
import { List, Datagrid, TextField, ReferenceField, Edit, EditButton, SimpleForm, DisabledInput, ReferenceInput, SelectInput, TextInput, LongTextInput, Create, Filter } from 'react-admin';

const CoachlogFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Coach" source="coach_id" reference="coaches" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const CoachlogList = (props) => (
    <List {...props} filters={<CoachlogFilter />} >
        <Datagrid>
            <TextField label="stuff" source="id" />
            <ReferenceField label="Coach" source="coach_id" reference="coaches">
                <TextField source="name" />
            </ReferenceField>
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
            <ReferenceInput label="Coach" source="coach_id" reference="coaches">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="school_visited" />
            <LongTextInput source="objectives_of_visit" />
        </SimpleForm>
    </Edit>
);

export const CoachlogCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label="Coach" source="coach_id" reference="coaches">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="school_visited" />
            <LongTextInput source="objectives_of_visit" />
        </SimpleForm>
    </Create>
);
