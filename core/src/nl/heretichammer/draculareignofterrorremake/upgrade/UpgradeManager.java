package nl.heretichammer.draculareignofterrorremake.upgrade;

import java.util.LinkedList;
import java.util.List;

import sun.reflect.generics.reflectiveObjects.NotImplementedException;

public abstract class UpgradeManager {
	protected List<Upgrade> upgrades = new LinkedList<Upgrade>();
	/**
	 * Current running upgrade
	 */
	protected Upgrade current;
	
	public void addUpgrade(Upgrade upgrade){
		upgrades.add(upgrade);
		//if(StringUtils.isEmptyOrNull(upgrade.getPreviousUpgradeName())){
		//	next = upgrade;
		//}
		throw new NotImplementedException();
	}
	
	public void start(){
		current.start();
	}
	
	public void stop(){
		current.stop();
	}
}
