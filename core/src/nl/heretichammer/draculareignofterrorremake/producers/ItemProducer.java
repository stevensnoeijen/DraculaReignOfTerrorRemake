package nl.heretichammer.draculareignofterrorremake.producers;

import nl.heretichammer.draculareignofterrorremake.items.Item;
import nl.heretichammer.draculareignofterrorremake.team.Team;

public class ItemProducer extends AbstractProducer<Item, ItemProducer.Model> {

	public ItemProducer(Model model) {
		super(model);
		// TODO Auto-generated constructor stub
	}

	public static class Model extends AbstractProducer.Model {
		
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
}
