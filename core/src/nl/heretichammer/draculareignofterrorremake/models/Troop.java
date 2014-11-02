package nl.heretichammer.draculareignofterrorremake.models;

import nl.heretichammer.draculareignofterrorremake.models.team.Team;
import nl.heretichammer.draculareignofterrorremake.models.team.Teamable;
import nl.heretichammer.draculareignofterrorremake.models.units.Unit;

import com.badlogic.gdx.utils.Array;

public class Troop<T extends Unit> implements Teamable {
	private Team team;
	private Array<T> units;
	private int size;
	
	public Troop(int size) {
		units = new Array<T>(size);
		this.size = size;
	}
	
	public void addUnits(T[] units) {
		this.units.addAll(units);
	}
	
	public void addUnit(T unit){
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
}
