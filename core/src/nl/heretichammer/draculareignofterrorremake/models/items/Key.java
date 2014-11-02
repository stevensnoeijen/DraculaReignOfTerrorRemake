package nl.heretichammer.draculareignofterrorremake.models.items;

public class Key extends AbstractItem<Key.Model> {

	public Key(Model model) {
		super(model);
	}
	
	public boolean use(Lockable lock){
		if(lock.isLocked()){
			lock.unlock(this);
		}else{
			lock.lock(this);
		}
		return false;
	}
	
	public static class Model extends Item.ItemData {
		
	}

	@Override
	public void accept(ItemVisitor visitor) {
		visitor.visit(this);		
	}
}
