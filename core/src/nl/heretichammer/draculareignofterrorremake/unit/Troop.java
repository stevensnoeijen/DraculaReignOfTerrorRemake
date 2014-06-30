package nl.heretichammer.draculareignofterrorremake.unit;

import com.badlogic.gdx.utils.Array;

public class Troop {
	private Array<Unit> units;
	private int size;
	
	public Troop(int size) {
		units = new Array<Unit>(size);
		this.size = size;
	}
	
	public void addUnits(Unit[] units) {
		this.units.addAll(units);
	}
	
	public void addUnit(Unit unit){
		units.add(unit);
	}
	
	public Unit[] getUnits() {
		return units.items;
	}
	
	public int getSize(){
		return size;
	}
	
	public static class TroopModel {
		public String name;
		public String unitName;
		public int size;
	}
}
