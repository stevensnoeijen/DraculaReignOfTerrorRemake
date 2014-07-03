package nl.heretichammer.draculareignofterrorremake.upgrade;

import java.util.LinkedList;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.ItemSuppliable;
import nl.heretichammer.draculareignofterrorremake.ItemSupplier;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;

import sun.reflect.generics.reflectiveObjects.NotImplementedException;

public class UpgradeManager implements Teamable, ItemSuppliable {
	protected List<Upgrade> upgrades = new LinkedList<Upgrade>();
	
	private Team team;
	
	
	public void addUpgrade(Upgrade upgrade){
		upgrades.add(upgrade);
		//if(StringUtils.isEmptyOrNull(upgrade.getPreviousUpgradeName())){
		//	next = upgrade;
		//}
		throw new NotImplementedException();
	}

	@Override
	public void setItemSupplier(ItemSupplier itemSupplier) {
		
	}

	@Override
	public void setTeam(Team team) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Team getTeam() {
		// TODO Auto-generated method stub
		return null;
	}
}
