package nl.heretichammer.draculareignofterrorremake.models.units;

import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.models.units.Unit;

import com.badlogic.gdx.utils.Array;

public class Troop implements Teamable {
	private Team team;
	private UnitType type;
	private Array<Unit> units;
	private int size;
	
	public Troop(UnitType type, int size) {
		this.type = type;
		this.units = new Array<Unit>(size);
		this.size = size;
	}
	
	public UnitType getType(){
		return type;
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
	
	public String getUnitName() {
		return units.get(0).getName();
	}
	
	public static class TroopModel {
		public String name;
		public String unitName;
		public int size;
	}

	public Team getTeam() {
		return team;
	}

	@Override
	public void setTeam(Team team) {
		this.team = team;
		team.addTroop(this);
	}
	
	public static class TroopData {
		public UnitType unitType;
		public int size;
	}
}
