public class assignClubCaptain {
    @AuraEnabled
    public static List<player__c> getPlayersList(Id selectedIdFromLwc){

        List<player__c> playersList = [SELECT Id, Name, Football_Club__c FROM player__c Where Football_Club__c =: selectedIdFromLwc];
        if(!playersList.isEmpty()){
        return playersList;
        }
        return null;
    }
    @AuraEnabled
    public static Boolean assignClubCaptain(Id lwcRowId){
        List<Football_Club__c> clubList = new List<Football_Club__c>();
        List<player__c> playerListForAssignment = [Select Id, Name, Football_Club__c From Player__c Where Id =: lwcRowId];
        if(!playerListForAssignment.isEmpty()){
            for(Player__c playerObj : playerListForAssignment){
                Football_Club__c clubObj = new Football_Club__c();
                clubObj.Id = playerObj.Football_Club__c;
                clubObj.Captain__c = playerObj.Id;
                clubList.add(clubObj);
            }
        }
        if(!clubList.isEmpty()){
            upsert clubList;
            return true;
        }
        return false;
    }
}