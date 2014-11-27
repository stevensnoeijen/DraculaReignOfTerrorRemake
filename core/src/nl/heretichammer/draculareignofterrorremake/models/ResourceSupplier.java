package nl.heretichammer.draculareignofterrorremake.models;

public interface ResourceSupplier {

	public void incrementResource(Resource resource, int amount);
	
	public void decrementResource(Resource resource, int amount);
	
	public boolean hasResource(Resource resource, int amount);
}
