package nl.heretichammer.draculareignofterrorremake.upgraders;


public class UpgraderManager extends AbstractUpgraderManager {
	
	public final Upgrader architecture;
	public final Upgrader armament;
		
	public UpgraderManager() {
		upgraders.add( architecture = UpgraderFactory.create("architecture") ); 
		upgraders.add( armament = UpgraderFactory.create("armament") );
	}
}
