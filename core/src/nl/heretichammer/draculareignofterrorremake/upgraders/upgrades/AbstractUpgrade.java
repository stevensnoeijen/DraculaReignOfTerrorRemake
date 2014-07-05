package nl.heretichammer.draculareignofterrorremake.upgraders.upgrades;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

import nl.heretichammer.draculareignofterrorremake.DRoTR;
import nl.heretichammer.draculareignofterrorremake.items.Item.ItemDescriptor;
import nl.heretichammer.draculareignofterrorremake.tbs.TBSTime;
import nl.heretichammer.draculareignofterrorremake.team.access.AccessManager;
import nl.heretichammer.draculareignofterrorremake.upgraders.Upgrader;
import nl.heretichammer.draculareignofterrorremake.utils.AbstractTeamableAccessableStartable;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSupplier;

public abstract class AbstractUpgrade<D extends Upgrade.UpgradeData> extends AbstractTeamableAccessableStartable implements Upgrade {
	protected final D data;
	private ItemSupplier itemSupplier;
	private Upgrader upgrader;
	
	public AbstractUpgrade(D data) {
		this.data = data;
	}
	
	@Override
	public void setItemSupplier(ItemSupplier itemSupplier) {
		this.itemSupplier = itemSupplier;  
	}
	
	@Override
	public boolean isAccessable() {
		if(StringUtils.isEmpty(data.accessName)) {//if no accessName it is accessable
			return true;
		}
		
		if(getTeam() != null) {
			return getTeam().accessManager.isAccessable(data.accessName);
		}else {
			return false;
		}
	}
	
	@Override
	public String getName() {
		return data.name;
	}
	
	@Override
	public int getLevel() {
		return data.level;
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
	
	protected abstract void upgrade();
	
	/**
	 * Only is really started when fully is {@link #pay()}-ed.
	 */
	@Override
	public void start() {
		if(isStartable()) {//TODO: almost the same as AbstractProducer#start() maybe combine?
			boolean payed = pay();
			if(payed) {
				started = true;
				DRoTR.tbs.time.schedule(new TBSTime.Task(data.turnCost) {
					@Override
					public void turn() {
						
					}
					
					@Override
					public void done() {
						upgrade();
						done();
					}
				});
			}
		}
	}
	
	/**
	 * Called when upgrade is done.
	 * Sets {@link AccessManager#putAccessable(String, int)} level of upgrade #done to true
	 */
	protected void done() {
		done = true;
		upgrader.onDone(this);
	}
	
	@Override
	public boolean isDone() {
		// TODO Auto-generated method stub
		return super.isDone();
	}
	
	@Override
	public void setUpgrader(Upgrader upgrader) {
		this.upgrader = upgrader;
	}
}
