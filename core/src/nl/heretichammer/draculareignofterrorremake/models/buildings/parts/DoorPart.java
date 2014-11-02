package nl.heretichammer.draculareignofterrorremake.models.buildings.parts;

import nl.heretichammer.draculareignofterrorremake.models.events.ClosedDoorEvent;
import nl.heretichammer.draculareignofterrorremake.models.events.OpenedDoorEvent;

public class DoorPart extends BuildingPart {
	private boolean open;
	
	public DoorPart(BuildingPartData data) {
		super(data);
	}

	public void open() {
		open = true;
		post(new OpenedDoorEvent());
	}

	public boolean isOpen() {
		return open;
	}

	public void close() {
		open = false;
		post(new ClosedDoorEvent());
	}
}
