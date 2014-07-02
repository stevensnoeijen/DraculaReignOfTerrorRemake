package nl.heretichammer.draculareignofterrorremake.items;

public class DefaultItem extends AbstractItem<Item.ItemModel> {
	
	public DefaultItem(ItemModel model, int amount) {
		super(model, amount);
	}

	@Override
	public void accept(ItemVisitor visitor) {
		visitor.visit(this);
	}
}
