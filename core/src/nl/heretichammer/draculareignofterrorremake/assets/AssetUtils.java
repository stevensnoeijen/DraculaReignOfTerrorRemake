package nl.heretichammer.draculareignofterrorremake.assets;

import java.lang.reflect.Field;

import com.badlogic.gdx.assets.AssetManager;

public class AssetUtils {
	
	public static void load(Object context, AssetManager assetManager){
		//load assets that are defined with fields
		for(Field field : context.getClass().getDeclaredFields()){
			if(field.isAnnotationPresent(Asset.class)){
				Asset asset = field.getAnnotation(Asset.class);
				assetManager.load(asset.value(), field.getType());
			}
		}
	}
	
	public static void bind(Object context, AssetManager assetManager){
		for(Field field : context.getClass().getDeclaredFields()){
			if(field.isAnnotationPresent(Asset.class)){
				Asset asset = field.getAnnotation(Asset.class);
				try {
					field.setAccessible(true);
					field.set(context, assetManager.get(asset.value(), field.getType()));
				} catch (Exception ex){
					throw new RuntimeException(ex);
				}
			}
		}
	}
	
	public static String getFileName(String drawableName){
		return drawableName.split(":")[0];
	}
}
