package nl.heretichammer.draculareignofterrorremake.items;

import nl.heretichammer.draculareignofterrorremake.unit.Unit;

public abstract class AbstractItem<D extends Item.ItemData> implements Item{
	protected final D data;
	private int amount;
	private Unit owner;
	
	public AbstractItem(D data, int amount) {
		this.data = data;
		this.amount = amount;
	}
	
	public AbstractItem(D data) {
		this(data, 1);
	}
	
	@Override
	public String getName() {
		return data.name;
	}
	
	@Override
	public String getDescription() {
		return data.description;
	}
	
	@Override
	public String getCategory() {
		return data.category;
	}
	
	@Override
	public int getWeight() {
		return data.weight * amount;
	}
	
	@Override
	public String getImage() {
		return data.image;
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
			return this.data == ((AbstractItem<?>)other).data;
		}else
			return false;
	}
	
	@Override
	public boolean isStackable(){
		return data.amountMax > 1;
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
		return data.amountMax;
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
				throw new RuntimeException(ex);
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
	
	public boolean is(Item.ItemDescriptor itemDescriptor) {
		return getName().equals(itemDescriptor.name) && amount >= itemDescriptor.amount;
	}
	
	@Override
	public String toString() {
		return "{" + data.name + ":" + amount + "}";
	}
}