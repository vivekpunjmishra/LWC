public class wireDemo {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(){
        List<Account> accountDeatails = [SELECT Id, Name from Account];
        return accountDeatails;
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(String selectedAccountId){
        List<Contact> contactDetails = [SELECT Id, Name from Contact where AccountId =: selectedAccountId];
        return contactDetails;
    }
} 