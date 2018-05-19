import React from 'react';
import { List, EmailField, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, DisabledInput, TextInput, LongTextInput, DateInput } from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
export const PostIcon = BookIcon;

export const UsersList = (props) => ( <List title = "All users" { ...props} >
                                        <Datagrid >
                                          <TextField source = "id" / >
                                          <TextField source = "name" / >
                                          <TextField source = "username" / >
                                            <EmailField source = "email" / >
                                            <EditButton / >
                                        </Datagrid> 
                                      </List>
);

const UsersTitle = ({record}) => {
  return <span > Post {
    record ? `"${record.title}"` : ''
  } < /span>;
};

export const UsersEdit = (props) => ( <Edit title = { < UsersTitle / >} { ...props} >
                                        <SimpleForm >
                                          <DisabledInput source = "id" / >
                                            <TextInput source = "title" / >
                                            <TextInput source = "teaser" options = {{multiLine: true}} /> 
                                              <LongTextInput source = "body" / >
                                              <DateInput label = "Publication date" source = "published_at" / >
                                            <TextInput source = "average_note" / >
                                          <DisabledInput label = "Nb views" source = "views" / >
                                        </SimpleForm> 
                                      </Edit>
);

export const UsersCreate = (props) => ( 
                                      <Create title = "Create a User" { ...props} >
                                          <SimpleForm >
                                            <TextInput source = "title" / >
                                            <TextInput source = "teaser" options = {{multiLine: true}} /> 
                                              <LongTextInput source = "body" / >
                                            <TextInput label = "Publication date" source = "published_at" / >
                                            <TextInput source = "average_note" / >
                                          </SimpleForm> 
                                        </Create>
);