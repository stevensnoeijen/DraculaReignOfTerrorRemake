package nl.heretichammer.draculareignofterrorremake;


public class Options {
	private OptionSaver saver = new OptionSaver("drotr/settings.xml", this);
	
	@Option public float sfx = 0.5f;
	@Option public float music = 0.5f;
	@Option public float brightness = 0.5f;
	@Option public float color = 0.5f;
	@Option public float contrast = 0.5f;
	@Option public float gamespeed = 0.5f;
	@Option public float scrollspeed = 0.5f;
	
	public void load(){
		saver.load();		
	}
	
	public void save(){
		saver.save();
	}
	
	/**
	 * Reset options to default
	 */
	public void reset(){
		saver.reset();
	}
	
	
}
