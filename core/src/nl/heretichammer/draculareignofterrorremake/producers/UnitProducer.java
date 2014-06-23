package nl.heretichammer.draculareignofterrorremake.producers;

import nl.heretichammer.draculareignofterrorremake.team.Team;
import nl.heretichammer.draculareignofterrorremake.unit.Unit;

public class UnitProducer extends AbstractProducer<Unit, UnitProducer.Model> {
	
	public UnitProducer(Model model) {
		super(model);
	}

	@Override
	public boolean isStartable() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void start() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean isStarted() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void stop() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean isDone() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isAccessable() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Team getTeam() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected void produce() {
		// TODO Auto-generated method stub
		
	}
	
	public static class Model extends AbstractProducer.Model {
		
	}
}
