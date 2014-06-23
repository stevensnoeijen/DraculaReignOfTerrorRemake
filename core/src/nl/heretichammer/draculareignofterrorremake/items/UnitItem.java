package nl.heretichammer.draculareignofterrorremake.items;

import nl.heretichammer.draculareignofterrorremake.unit.Unit;

public class UnitItem extends AbstractItem<UnitItem.Model> {

	private Unit unit;
	
	public UnitItem(Model model) {
		super(model);
	}

	@Override
	public void accept(ItemVisitor visitor) {
		visitor.visit(this);
	}

	public static class Model extends Item.ItemModel {
		
	}
}
