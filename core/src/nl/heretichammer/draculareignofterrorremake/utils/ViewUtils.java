package nl.heretichammer.draculareignofterrorremake.utils;

import java.lang.reflect.Field;

import nl.heretichammer.draculareignofterrorremake.annotations.View;

import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.Group;

public class ViewUtils {
	
	public static void bind(Group root, Object context){
		for(Field field : context.getClass().getDeclaredFields()){
			if(field.isAnnotationPresent(View.class)){
				View view = field.getAnnotation(View.class);
				Actor actor = root.findActor(view.value());
				try {
					field.setAccessible(true);
					field.set(context, field.getType().cast(actor));
				} catch (Exception ex){
					throw new RuntimeException(ex);
				}
			}
		}
	}
}
