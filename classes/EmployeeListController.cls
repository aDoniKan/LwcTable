public with sharing class EmployeeListController {
    @AuraEnabled(cacheable=true)
    public static List<Employee__c> getEmployees(String employeeId) {
        return [
            SELECT Id, Name, BirthDay__c, Gender__c, Salary__c
            FROM Employee__c
            WHERE Id =: employeeId
        ];
    }

    @AuraEnabled
    public static  List<Employee__c> delEmployee(String employeeId) {
    //    System.debug('Record'+ record);
    
        Employee__c employee = [
            SELECT Name, BirthDay__c, Gender__c, Salary__c
            FROM Employee__c
            WHERE Id = :employeeId
        ][0];

        delete employee;
        
        return getEmployees(employeeId);
       
    }





}
