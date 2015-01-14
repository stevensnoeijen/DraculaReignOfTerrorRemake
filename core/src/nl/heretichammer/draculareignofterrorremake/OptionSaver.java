package nl.heretichammer.draculareignofterrorremake;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Preferences;

public class OptionSaver {	
	private Preferences preferences;
	private Map<String, Object> defaults = new HashMap<String, Object>();
	private Map<String, Field> options = new HashMap<String, Field>();
	private Object context;
	
	public OptionSaver(String fileName, Object context){
		preferences = Gdx.app.getPreferences(fileName);
		this.context = context;
		scan(context);		
		loadDefaults();//default options to defaults map
	}
	
	/**
	 * Scan for all options and add to the options set
	 * @param context of the object that contain the options.
	 */
	private void scan(Object context){
		for(Field field : context.getClass().getFields()){
			if(field.isAnnotationPresent(Option.class)){//only public option fields
				options.put(field.getName(), field);
			}
		}
	}
	
	/**
	 * Load option default value to map for {@link #reset()}.
	 */
	private void loadDefaults(){
		try{
			for(Field field : context.getClass().getFields()){
				if(field.isAnnotationPresent(Option.class)){//only public option fields
					defaults.put(field.getName(), field.get(context));
				}
			}
		}catch(IllegalAccessException ex){
			throw new RuntimeException(ex);
		}
	}
	
	public void save(){
		try{
			for(Field field : options.values()){
				setPreference(field.getName(), field.get(context), field.getType());
			}
		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}
		//save to file
		preferences.flush();
	}
	
	/**
	 * Load values from perferences to the options
	 */
	public void load(){
		try{
			for(Field field : options.values()){
				Object value = getPreference(field.getName(), field.getType());
				field.set(context, value);
			}
		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}
	}
	
	private void setPreference(String name, Object value, Class<?> type){
		if(type == String.class){
			preferences.putString(name, (String)value);
		}else if(type == int.class){
			preferences.putInteger(name, (Integer)value);
		}else if(type == float.class){
			preferences.putFloat(name, (Float)value);
		}else if(type == boolean.class){
			preferences.putBoolean(name, (Boolean)value);
		}else{
			throw new UnsupportedOperationException();
		}
	}
	
	@SuppressWarnings("unchecked")
	private <T> T getPreference(String name, Class<T> type){
		Object defaultValue = getDefault(name);
		if(type == String.class){
			return (T) preferences.getString(name, (String) defaultValue);
		}else if(type == int.class){
			return (T) Integer.valueOf( preferences.getInteger(name, (Integer) defaultValue) );
		}else if(type == float.class){
			return (T) Float.valueOf( preferences.getFloat(name, (Float) defaultValue) );
		}else if(type == boolean.class){
			return (T) Boolean.valueOf( preferences.getBoolean(name, (Boolean) defaultValue) );
		}else{
			throw new UnsupportedOperationException();
		}
	}
	
	private Object getDefault(String name){
		return defaults.get(name);
	}
	
	/**
	 * Reset to defaults.
	 */
	public void reset(){
		try{
			for(Map.Entry<String, Object> defaultValue : defaults.entrySet()){
				options.get(defaultValue.getKey()).set(context, defaultValue.getValue());
			}
		}catch(IllegalAccessException ex){
			throw new RuntimeException(ex);
		}
	}
}
