package nl.heretichammer.draculareignofterrorremake.models.upgraders;


public class UpgraderManager extends AbstractUpgraderManager {
	
	public final Upgrader architecture;
	public final Upgrader armament;
		
	public UpgraderManager() {
		upgraders.add( architecture = UpgraderFactory.create("architecture") ); 
		upgraders.add( armament = UpgraderFactory.create("armament") );
	}

	public Upgrader getUpgrader(String name) {
		for(Upgrader upgrader : upgraders) {
			if(upgrader.getName().equals(name)) {
				return upgrader;
			}
		}
		return null;
	}
	
	public void week(){
		
	}
}
