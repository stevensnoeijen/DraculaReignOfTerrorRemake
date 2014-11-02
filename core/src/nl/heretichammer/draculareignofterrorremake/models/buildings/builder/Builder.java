package nl.heretichammer.draculareignofterrorremake.models.buildings.builder;

import nl.heretichammer.draculareignofterrorremake.models.ResourceSupplier;
import nl.heretichammer.draculareignofterrorremake.models.buildings.Building;

public interface Builder {
	public void constructStart();
	public void constructStop();
	public void repairStart(Building building);
	public void repairStop(Building building);
	public void upgradeStart(Building building);
	public void upgradeStop(Building building);
	public void setItemSupplier(ResourceSupplier resourceSupplier);
}
