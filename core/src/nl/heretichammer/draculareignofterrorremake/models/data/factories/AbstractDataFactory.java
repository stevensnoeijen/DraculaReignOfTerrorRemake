package nl.heretichammer.draculareignofterrorremake.models.data.factories;

import java.lang.reflect.TypeVariable;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.exceptions.DataDoesNotExistsException;
import nl.heretichammer.draculareignofterrorremake.models.unit.Unit;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.files.FileHandle;
import com.badlogic.gdx.utils.Json;
import com.badlogic.gdx.utils.JsonValue;

public abstract class AbstractDataFactory<D> {
	protected static final Json json = new Json();
	protected static final Map<String, Object> cache = new HashMap<String, Object>();
	
	public abstract D fromFile(String name);
	
	/**
	 * get from cache (if available) or file
	 * @param file
	 * @return
	 */
	@SuppressWarnings("unchecked")
	protected static <T> T get(String fileName, Class<T> type) {
		T data;
		if( cache.containsKey(fileName) ) {
			data = (T)cache.get(fileName);
		}else {
			FileHandle file = Gdx.files.internal(fileName);
			if(!file.exists()){
				throw new DataDoesNotExistsException();
			}			
			data = json.fromJson(type, file);
			cache.put(fileName, data);
		}
		return data;
	}
}
