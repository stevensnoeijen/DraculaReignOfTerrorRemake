package nl.heretichammer.draculareignofterrorremake.models.items.consumables;

public interface Consumable {
	public Consumable.Ingestion getIngestion();
	public int getAmount();
	public void consume();
	
	public static enum Ingestion {
		EAT, DRINK
	}
}
