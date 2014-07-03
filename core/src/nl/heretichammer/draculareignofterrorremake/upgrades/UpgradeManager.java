package nl.heretichammer.draculareignofterrorremake.upgrades;

import java.util.LinkedList;
import java.util.List;

import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSuppliable;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSupplier;

import sun.reflect.generics.reflectiveObjects.NotImplementedException;

public class UpgradeManager implements Teamable, ItemSuppliable {
	protected List<Upgrade> upgrades = new LinkedList<Upgrade>();
	
	private Team team;
	

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
