package nl.heretichammer.draculareignofterrorremake.items;

import nl.heretichammer.draculareignofterrorremake.unit.abilities.Ability;

public class AbilityItem extends AbstractItem<AbilityItem.Model> {

	public AbilityItem(Model model) {
		super(model);
	}

	private Ability ability;

	@Override
	public void accept(ItemVisitor visitor) {
		visitor.visit(this);
	}
	
	public static class Model extends Item.ItemData {
		
	}
}
