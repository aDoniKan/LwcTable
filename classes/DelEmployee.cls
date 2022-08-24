public with sharing class DelEmployee {
    public String record{get;set;}

    @AuraEnabled(cacheable=true)
    public static List<Employee__c> delEmployee() {
        return [
            SELECT Name, BirthDay__c, Gender__c, Salary__c
            FROM Employee__c
            WHERE Id = 'record'
        ];
    }
    
}


