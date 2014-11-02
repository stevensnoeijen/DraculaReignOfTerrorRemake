package nl.heretichammer.draculareignofterrorremake.models.items.consumables;

import nl.heretichammer.draculareignofterrorremake.exceptions.NoOwnerException;
import nl.heretichammer.draculareignofterrorremake.models.unit.Unit;
import nl.heretichammer.draculareignofterrorremake.models.unit.abilities.Ability;

public class AbilityConsumable extends AbstractConsumable<AbilityConsumable.Model> {
	
	private Ability ability;
	
	public AbilityConsumable(Model model) {
		super(model);
	}
	
	/**
	 * consume one.
	 */
	public void consume(){
		final Unit owner = getOwner();
		if(owner == null){
			throw new NoOwnerException();
		}
		//owner.pushAbility(ability);
		remove(1);
	}
	
	public static class Model extends AbstractConsumable.Model {
		//public Unit.Attribute attribute;
		public String ability;
	}

}
