package nl.heretichammer.draculareignofterrorremake.items;

public class Resource extends AbstractItem<Resource.Model>{
	
	public Resource(Model model) {
		super(model);
	}
	
	public static class Model extends Item.ItemModel {
		//ResourceType?
	}

	@Override
	public void accept(ItemVisitor visitor) {
		visitor.visit(this);
	}
}
