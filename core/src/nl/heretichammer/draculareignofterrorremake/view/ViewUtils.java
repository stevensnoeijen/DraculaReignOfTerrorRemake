package nl.heretichammer.draculareignofterrorremake.view;

import java.lang.reflect.Field;

import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.Group;

public class ViewUtils {
	
	public static void bind(Group root, Object context){
		for(Field field : context.getClass().getDeclaredFields()){
			if(field.isAnnotationPresent(Bind.class)){
				Bind view = field.getAnnotation(Bind.class);
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
