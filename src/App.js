import React, { useState, Fragment } from 'react';
import { nanoid } from 'nanoid';
import './App.css';
import data from './mock-data.json';
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';


//Leaving the page empty to solely create the table.
const App = () => {
  {/*Initiating the useState hook with the imported data so it updates. */}
  const [contacts, setContacts] = useState(data);
  {/*Initiating the useState hook with form data so it updates the values of the table. */}
  const [addFormData, setAddFormData] = useState(
    {
      fullName : '',
      address : '',
      phoneNumber : '',
      email : ''
    }
  )

  const [editFormData, setEditFormData] = useState(
    {
      fullName : '',
        address : '',
        phoneNumber : '',
        email : ''
    }
  )

  {/*New State hook for the editting component. */}
  const [editContactId, setEditContactId] = useState(null);


{/*-------------------------------------EFFICIENT CODE WHEN HANDLING FORMS. ANALYZE FOR LATER------------------------------------------- */}
  {/*Creating a function that will handle the form-related State changes. */}
  const handleAddFormChange = (event) =>
  {
    event.preventDefault();

    {/*Fetching the attributes of a column block and their values. Like 'phoneNumber' with it's value */}
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

     {/*Using a spread operator to attach the previous form data to a new variable, to prevent mutations to the original form. */}
    const newFormData = { ...addFormData};

    {/*Updating the key field of the form with it's value in the mock form. */}
    newFormData[fieldName] = fieldValue;

    {/*Updating the original form itself. */}
    setAddFormData(newFormData);
  }
{/*-------------------------------------------------------------------------------------------------------------------------------------- */}

const handleEditFormChange = (event) =>
  {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData};

    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

const handleAddFormSubmit = (event) =>
{
  event.preventDefault();

  const newContact = {
    id : nanoid(),
    fullName : addFormData.fullName,
    address : addFormData.address,
    phoneNumber : addFormData.phoneNumber,
    email : addFormData.email
  }

  const newContacts = [...contacts, newContact];

  setContacts(newContacts);
}

const handleEditFormSubmit = (event) => {
  event.preventDefault();

  const editedContact = {
    id : editContactId,
    fullName : editFormData.fullName,
    address : editFormData.address,
    phoneNumber : editFormData.phoneNumber,
    email : editFormData.email,
  }

  const newContacts = [...contacts]

  const index = contacts.findIndex((contact) => contact.id === editContactId)

  newContacts[index] = editedContact;

  setContacts(newContacts);
  setEditContactId(null);

}

const handleEditClick = (event, contact) => 
{
  event.preventDefault();
  setEditContactId(contact.id);

  const formValues={
    fullName : contact.fullName,
    address : contact.address,
    phoneNumber : contact.phoneNumber,
    email : contact.email,
  }

  setEditFormData(formValues);
};
setContacts
{/*Creating a function for the Cancel button that will revert editContactId to null and nullify the editing process. */}
const handleCancelClick = () => {
  setEditContactId(null);
}


{/*Creating a function for the Delete button that will delete a row from the form. */}
const handleDeleteClick = (contactId) =>
{

  const newContacts = [...contacts];

  const index = contacts.findIndex((contact) => contact.id === contactId); 

  newContacts.splice(index,1);

  setContacts(newContacts);
}



  return (
    <div className="app-container">
      {/*The table component of the app. */}
      {/*Wrapping the entire table in the form tag to enable editting via the EditableRow component. */}
      <form onSubmit={handleEditFormSubmit}>
        <table>
          {/*The head of the table with the names of the columns. */}
          <thead>
            <tr>
              <th>Full Name/Pilnas Vardas</th>
              <th>Address/Adresas</th>
              <th>Phone Number/Tel. Numeris</th>
              <th>Email/El. Paštas</th>
              <th>Actions/Veiksmai</th>
            </tr>
          </thead>
              
          <tbody>   
            {contacts.map((contact)=>
              (
                <Fragment>
                  { 
                    editContactId === contact.id ? (
                      <EditableRow 
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />  
                    ) : ( 
                      <ReadOnlyRow 
                        contact = {contact}
                        handleEditClick = {handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )  
                  }
                </Fragment>
              ))}
            {/*Replacing the mapping content by placing the read only data in a separate component, ReadOnlyRow.js . This make working on multiple parts of the code more concise. */}
          </tbody>
        </table>
      </form>
      <h2>
        Add a new contact
        <form onSubmit={handleAddFormSubmit}>  {/*Creating a form to add a new record. Four inputs for four details.*/}
          {/*Input for the full name. The onChange parameter guides to the function that updates the state changes in the form. */}
          <input
            type = 'text'
            name = 'fullName'
            required = 'required'
            placeholder = 'Enter a name for a new contact...'
            onChange = {handleAddFormChange} 
          />
          {/*Input for the address */}
          <input
            type = 'text'
            name = 'address'
            required = 'required'
            placeholder = 'Enter the address for a new contact...'
            onChange = {handleAddFormChange}
          />
          {/*Input for the phone number */}
          <input
            type = 'text'
            name = 'phoneNumber'
            required = 'required'
            placeholder = 'Enter the phone number of a new contact...'
            onChange = {handleAddFormChange}
          />
          {/*Input for the email address */}
          <input
            type = 'email'
            name = 'email'
            required = 'required'
            placeholder = 'Enter the email address of a new contact...'
            onChange = {handleAddFormChange}
          />
          <button type='submit'>
            Add/Pridėti
          </button>
        </form>
      </h2>

    </div>
  );
}

export default App;
