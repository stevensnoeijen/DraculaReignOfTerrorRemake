package nl.heretichammer.draculareignofterrorremake.items.consumables;

import nl.heretichammer.draculareignofterrorremake.items.AbstractItem;
import nl.heretichammer.draculareignofterrorremake.items.Item;

public abstract class AbstractConsumable<M extends AbstractConsumable.Model> extends AbstractItem<M> implements Consumable {
	
	public AbstractConsumable(M model) {
		super(model);
	}
	
	@Override
	public Ingestion getIngestion() {
		return model.ingestion;
	}
	
	@Override
	public void accept(ItemVisitor visitor) {
		visitor.visit(this);
	}
	
	public static class Model extends Item.ItemModel{
		public Consumable.Ingestion ingestion;
		public int amount;
	}
}
