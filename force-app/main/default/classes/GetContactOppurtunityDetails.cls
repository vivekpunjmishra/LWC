public with sharing class GetContactOppurtunityDetails {
    @AuraEnabled
    public static List<Account> getChildDetails(String recId) {
        List<Account> accList = [SELECT Id, Name, (SELECT Id, Name FROM Contacts),(Select Id, Name From Opportunities) 
        FROM Account WHERE Id =: recId];
        System.debug('accList'+accList);
        //Null Check
        if(!accList.isEmpty()){
            return accList;
        }
        return null;

    }
    @AuraEnabled
    public static List<Account> getAccounts(){
        List<Account> acclst = [SELECT Id, Name FROM Account];
        return acclst;
    }
}