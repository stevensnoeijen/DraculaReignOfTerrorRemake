package nl.heretichammer.draculareignofterrorremake.items;

import nl.heretichammer.draculareignofterrorremake.DRoTR;
import nl.heretichammer.draculareignofterrorremake.unit.Unit;

public abstract class AbstractItem<M extends Item.ItemModel> implements Item{
	protected final M model;
	private int amount;
	private Unit owner;
	
	public AbstractItem(M model) {
		this.model = model;
	}
	
	@Override
	public String getName() {
		return model.name;
	}
	
	@Override
	public String getDescription() {
		return model.description;
	}
	
	@Override
	public String getCategory() {
		return model.category;
	}
	
	@Override
	public int getWeight() {
		return model.weight * amount;
	}
	
	@Override
	public String getImage() {
		return model.image;
	}
	
	@Override
	public Unit getOwner() {
		return owner;
	}
	
	@Override
	public void setOwner(Unit owner) {
		this.owner = owner;		
	}
	
	@Override
	public boolean equalModel(Item other) {
		if(other instanceof AbstractItem<?>){
			return this.model == ((AbstractItem<?>)other).model;
		}else
			return false;
	}
	
	@Override
	public boolean isStackable(){
		return model.amountMax > 1;
	}
	
	@Override
	public boolean isStacked() {
		return amount > 1;
	}
	
	@Override
	public int getAmount() {
		return amount;
	}

	@Override
	public int getAmountMax() {
		return model.amountMax;
	}

	private int amountLeft(){
		return getAmountMax() - getAmount();
	}
	
	@Override
	public void add(Item item) {
		if(equalModel(item) && canAdd(item)){
			//add total item to this
			this.amount += item.getAmount();
			item = null;
		}else{
			//add partly
			add( item.remove(amountLeft()) );//remove amount from the item and add it
		}
	}
	
	public boolean canAdd(Item item){
		return this.amount + item.getAmount() <= getAmountMax();
	}
	
	@Override
	public Item remove(int amount) {
		if(canRemove(amount)){	
			try {
				AbstractItem<?> removed = (AbstractItem<?>) clone();
				this.amount -= amount;
				removed.amount = amount;
				return removed;
			} catch (CloneNotSupportedException ex) {
				DRoTR.log(ex);
				return null;
			}
		}else
			return null;
	}
	
	public boolean canRemove(int amount){
		return getAmount() - amount >= 0;
	}
	
	@Override
	public boolean isEmpty() {
		return amount == 0;
	}
	
	@Override
	public boolean isFull() {
		return amount == getAmountMax();
	}
}