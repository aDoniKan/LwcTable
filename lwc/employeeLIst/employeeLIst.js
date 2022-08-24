import { LightningElement, wire, track, api } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Employee__c.Name';
import GENDER__c_FIELD from '@salesforce/schema/Employee__c.Gender__c';
import BIRTHDAY__c_FIELD from '@salesforce/schema/Employee__c.BirthDay__c';
import SALARY__c_FIELD from '@salesforce/schema/Employee__c.Salary__c';
import getEmployees from '@salesforce/apex/InsertEmployee.getEmployees';
import delEmployee from '@salesforce/apex/InsertEmployee.delEmployee';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import EMPLOYEE__C_OBJECT from '@salesforce/schema/Employee__c';
import BIRTHDAY__C_FIELD from '@salesforce/schema/Employee__c.BirthDay__c';
import GENDER_FIELD from '@salesforce/schema/Employee__c.Gender__c';
import SALARY_FIELD from '@salesforce/schema/Employee__c.Salary__c';


const COLUMNS = [
    { label: 'Employee Name', fieldName: NAME_FIELD.fieldApiName, type: 'text',editable: true },
    { label: 'Gender', fieldName: GENDER__c_FIELD.fieldApiName, type: 'text',editable: true },
    { label: 'Salary', fieldName: SALARY__c_FIELD.fieldApiName, type: 'text',editable: true },
    { label: 'BirthDay', fieldName: BIRTHDAY__c_FIELD.fieldApiName, type: 'text',editable: true },
    {
      type: "button",
      name: "del1",
      typeAttributes: {
         
          label: "Delete",
          title: "Delete",
          name: "Delete",
          iconPosition: "center",
          variant: "brand"
        }
      },
      
];

export default class employeeLIst extends LightningElement {

  @track
  list  

  columns = COLUMNS;
  objectApiName = EMPLOYEE__C_OBJECT;
  fields = [NAME_FIELD, BIRTHDAY__C_FIELD, GENDER_FIELD, SALARY_FIELD];

  @api 
  loadData(){ 
    getEmployees().then(result => {
      this.list = result;
    })
  }

    connectedCallback(){
      this.loadData();
    }

    handleClick(event) {
        const record = event.detail.row.Id;
        const idToButton = event.detail.action.name
          if(idToButton === "Delete"){
            delEmployee({record:record}).then((result) => {
              this.list = result;
            });
          } 
    }

    @api
    handleSuccess(event) {
      refreshApex(this.list);
    }

    async handleSave(event) {
      // Convert datatable draft values into record objects
      const records = event.detail.draftValues.slice().map((draftValue) => {
          const fields = Object.assign({}, draftValue);
          return { fields };
      });

      // Clear all datatable draft values
      this.draftValues = [];

      try {
          // Update all records in parallel thanks to the UI API
          const recordUpdatePromises = records.map((record) =>
              updateRecord(record)
          );
          await Promise.all(recordUpdatePromises);

          // Report success with a toast
          this.dispatchEvent(
              new ShowToastEvent({
                  title: 'Success',
                  message: 'Contacts updated',
                  variant: 'success'
              })
          );

          // Display fresh data in the datatable
          await refreshApex(this.contacts);
      } catch (error) {
          this.dispatchEvent(
              new ShowToastEvent({
                  title: 'Error updating or reloading contacts',
                  message: error.body.message,
                  variant: 'error'
              })
          );
      }
  }
}

