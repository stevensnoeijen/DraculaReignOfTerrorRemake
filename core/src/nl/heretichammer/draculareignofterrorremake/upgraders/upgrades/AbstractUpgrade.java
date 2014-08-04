package nl.heretichammer.draculareignofterrorremake.upgraders.upgrades;

import nl.heretichammer.draculareignofterrorremake.GameObject;
import nl.heretichammer.draculareignofterrorremake.items.Item.ItemDescriptor;
import nl.heretichammer.draculareignofterrorremake.team.access.AccessManager;
import nl.heretichammer.draculareignofterrorremake.upgraders.Upgrader;
import nl.heretichammer.draculareignofterrorremake.utils.ItemSupplier;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

public abstract class AbstractUpgrade<D extends Upgrade.UpgradeData> extends GameObject implements Upgrade {
	protected final D data;
	private boolean started = false;
	private int turn = 0;
	private ItemSupplier itemSupplier;
	private Upgrader upgrader;
	private boolean done = false;
	
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
	public ItemDescriptor getCost(String name) {
		for(ItemDescriptor item : data.cost) {
			if(item.name.toLowerCase().equals(name)) {
				return item;
			}
		}
		return null;
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
			}
		}
	}
	
	public boolean isStartable() {
		return isAccessable();
	}
	
	@Override
	public boolean isStarted() {
		return started;
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
		return done;
	}
	
	@Override
	public void setUpgrader(Upgrader upgrader) {
		this.upgrader = upgrader;
	}
	
	private void setTurn(int turn) {
		if(turn < 0) {
			throw new IllegalArgumentException("Turn can not be <0");
		}
		int oldValue = this.turn;
		this.turn = turn;
		firePropertyChange("turn", oldValue, turn);
	}
	
	/**
if(!started && isAutoStart()) {
			start();
		}		
		if(started) {
			setTurn(turn + 1);
			if(turn >= getTurnCost()) {
				//if done
				handleProduct();
				done();
			}
		}
	 */
	
	@Override
	public void turn() {
		if(started) {
			setTurn(turn + 1);
			if(turn >= getTurnCost()) {
				//is done
				upgrade();
				done();
			}
		}
	}
	
	public String getImage() {
		return data.image;
	}
}
