package nl.heretichammer.draculareignofterrorremake.items;

public class BaseItem extends AbstractItem<Item.ItemModel> {
	
	public BaseItem(ItemModel model) {
		super(model);
	}

	@Override
	public void accept(ItemVisitor visitor) {
		visitor.visit(this);
	}
}
