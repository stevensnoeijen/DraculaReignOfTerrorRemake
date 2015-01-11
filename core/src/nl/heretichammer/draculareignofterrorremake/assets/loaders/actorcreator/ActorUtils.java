package nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.Map;

import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.math.Interpolation;

public abstract class ActorUtils {
	private static Map<String, Interpolation> interpolations = new HashMap<String, Interpolation>();
	
	static {
		try {
			for(Field field : Interpolation.class.getDeclaredFields()){
				if(Modifier.isStatic(field.getModifiers())){
					String name = field.getName();
					Interpolation interpolation = (Interpolation)field.get(null);
					interpolations.put(name, interpolation);
					interpolations.put(name.toLowerCase(), interpolation);
				}
			}
		} catch (IllegalAccessException ex) {
			throw new RuntimeException(ex);
		}
	}
	
	public static Interpolation parseInterpolation(String name){
		return interpolations.get(interpolations);
	}
	
	public static Color parseColor(String value){
		try {
			return (Color) Color.class.getField(value.toUpperCase()).get(null);
		} catch (Exception ex) {
			throw new UnsupportedOperationException();
		}
	}
}
