package nl.heretichammer.draculareignofterrorremake;


public class Options {
	private OptionSaver saver;
	
	@Option public float sfx = 0.5f;
	@Option public float music = 0.5f;
	@Option public float brightness = 0.5f;
	@Option public float color = 0.5f;
	@Option public float contrast = 0.5f;
	@Option public float gamespeed = 0.5f;
	@Option public float scrollspeed = 0.5f;
	
	public void load(){
		saver = new OptionSaver("drotr/options.xml", this);
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
	
	public void set(String name, Object value){
		try{
			getClass().getField(name).set(this, value);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}
	}
	
	public Object get(String name){
		try{
			return getClass().getField(name).get(this);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}
	}
}
