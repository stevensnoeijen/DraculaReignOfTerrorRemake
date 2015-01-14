package nl.heretichammer.draculareignofterrorremake;

import java.lang.reflect.Field;

import com.badlogic.gdx.utils.Disposable;

import nl.heretichammer.draculareignofterrorremake.assets.Asset;

public class Disposer {
	/**
	 * Disposes all {@link Asset} fields and set them to null.
	 * @param context that containt assets
	 */
	public static void dispose(Object context){
		try{
			for(Field field : context.getClass().getFields()){
				if(field.isAccessible() && field.isAnnotationPresent(Asset.class)){
					((Disposable)field.get(context)).dispose();
					field.set(context, null);
				}
			}
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}
	}
}
