package nl.heretichammer.draculareignofterrorremake.utils;

import java.beans.PropertyChangeEvent;
import java.lang.reflect.Method;

import nl.heretichammer.draculareignofterrorremake.models.Model;

import com.badlogic.gdx.scenes.scene2d.ui.Label;
import com.google.common.eventbus.Subscribe;

public class Binder {
	public static void bind(Model model, final String modelProperty, final Label view){
		String modelGetName = "get" + Character.toString(modelProperty.charAt(0)).toUpperCase() + modelProperty.substring(1);
		try {
			Method modelGetter = model.getClass().getMethod(modelGetName);
			String value = modelGetter.invoke(model).toString();
			view.setText(value);
			//listen to changes
			model.register(new Object(){
				@Subscribe
				public void on(PropertyChangeEvent e){
					if(e.getPropertyName().equals(modelProperty)){
						String value = e.getNewValue().toString();
						view.setText(value);
					}
				}
			});
			
		} catch (Exception ex){
			throw new RuntimeException(ex);
		}
	}
}
