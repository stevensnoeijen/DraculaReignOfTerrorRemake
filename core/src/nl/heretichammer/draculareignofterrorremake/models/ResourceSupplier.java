package nl.heretichammer.draculareignofterrorremake.models;

public interface ResourceSupplier {

	public void incrementResource(ResourceType resource, int amount);
	
	public void decrementResource(ResourceType resource, int amount);
	
	public boolean hasResource(ResourceType resource, int amount);
}
