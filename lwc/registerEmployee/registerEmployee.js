import { LightningElement, wire, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import EMPLOYEE__C_OBJECT from '@salesforce/schema/Employee__c';
import NAME_FIELD from '@salesforce/schema/Employee__c.Name';
import BIRTHDAY__C_FIELD from '@salesforce/schema/Employee__c.BirthDay__c';
import GENDER_FIELD from '@salesforce/schema/Employee__c.Gender__c';
import SALARY_FIELD from '@salesforce/schema/Employee__c.Salary__c';
import getEmployees from '@salesforce/apex/InsertEmployee.getEmployees';



export default class registerEmployee extends LightningElement {



    @track 
    list = []

    objectApiName = EMPLOYEE__C_OBJECT;
    fields = [NAME_FIELD, BIRTHDAY__C_FIELD, GENDER_FIELD, SALARY_FIELD];
    
    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Employee created",
            message: "Record ID: " + event.detail.id, // exibe o id do registro criado
            variant: "success"
        });
        
        
        this.dispatchEvent(toastEvent);

        this.template.querySelector("c-employee-l-ist").handleSuccess();

    }
   
  }
