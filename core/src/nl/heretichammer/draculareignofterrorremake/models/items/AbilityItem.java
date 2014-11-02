package nl.heretichammer.draculareignofterrorremake.models.items;

import nl.heretichammer.draculareignofterrorremake.models.unit.abilities.Ability;

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
