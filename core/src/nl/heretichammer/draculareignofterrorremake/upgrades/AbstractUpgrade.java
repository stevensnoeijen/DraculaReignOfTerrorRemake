package nl.heretichammer.draculareignofterrorremake.upgrades;

import org.apache.commons.lang3.ArrayUtils;

import nl.heretichammer.draculareignofterrorremake.DRoTR;
import nl.heretichammer.draculareignofterrorremake.items.Item.ItemDescriptor;
import nl.heretichammer.draculareignofterrorremake.tbs.TBSTime;
import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSupplier;

public abstract class AbstractUpgrade<D extends Upgrade.UpgradeData> implements Upgrade {
	protected final D data;
	private Team team;
	private ItemSupplier itemSupplier;
	private boolean done = false;
	private boolean started = false;
	
	public AbstractUpgrade(D data) {
		this.data = data;
	}
	
	@Override
	public void setItemSupplier(ItemSupplier itemSupplier) {
		this.itemSupplier = itemSupplier;  
	}

	@Override
	public void setTeam(Team team) {
		this.team = team;
	}

	@Override
	public Team getTeam() {
		return team;
	}

	@Override
	public boolean isAccessable() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public String getName() {
		return data.name;
	}

	@Override
	public ItemDescriptor[] getCost() {
		return data.cost;
	}

	@Override
	public int getTurnCost() {
		return data.turnCost;
	}

	private boolean pay() {
		return !ArrayUtils.isEmpty(itemSupplier.removeItems(data.cost));//if all items are removed is the array not empty
	}
	
	@Override
	public void start() {
		boolean payed = pay();
		if(payed) {
		started = true;
			DRoTR.tbs.time.schedule(new TBSTime.Task(data.turnCost) {
				@Override
				public void turn() {
					
				}
				
				@Override
				public void done() {
					done = true;
				}
			});
		}
	}

	@Override
	public void stop() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean isDone() {
		return done;
	}
	
}
