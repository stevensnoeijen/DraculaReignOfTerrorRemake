package nl.heretichammer.draculareignofterrorremake.models;

public interface ResourceSupplier {
	public void removeSupplies(int gold, int wood, int food);
	public boolean canSupply(int gold, int wood, int food);
	public void addSupplies(int gold, int wood, int food);
}
