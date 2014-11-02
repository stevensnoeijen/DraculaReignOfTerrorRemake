package nl.heretichammer.draculareignofterrorremake.models.items;

public class BaseItem extends AbstractItem<Item.ItemData> {
	
	public BaseItem(ItemData model, int amount) {
		super(model, amount);
	}

	@Override
	public void accept(ItemVisitor visitor) {
		visitor.visit(this);
	}
}
