public with sharing class forEachDemoClass {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        List<Account> accountList = [SELECT Id, Name from Account];
        return accountList;
    }
}