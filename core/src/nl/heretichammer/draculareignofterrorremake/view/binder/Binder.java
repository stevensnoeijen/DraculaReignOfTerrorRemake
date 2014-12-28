package nl.heretichammer.draculareignofterrorremake.view.binder;

import java.beans.PropertyChangeEvent;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.models.Model;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.ui.Label;
import com.google.common.eventbus.Subscribe;

public class Binder {
	private static Map<Actor, Binder> binders = new HashMap<Actor, Binder>();
	
	public static void bind(Label view, Model model, String modelProperty, Object...args){
		Binder binder = new Binder(view, model, modelProperty, args);
		binders.put(view, binder);
	}
	
	public static void unbind(Actor...views){
		for (Actor view : views) {
			binders.remove(view).unbind();
		}
	}
	
	public static void unbindAll(){
		//unbind all, remove all after
		for (Binder binder : binders.values()) {
			binder.unbind();
		}
		binders.clear();
	}
	
	private Model model;
	private String modelProperty;
	private Method modelGetter;
	private Object[] modelGetterArgs;
	private Label view;
	private Object listener;
	
	protected Binder(Label view, Model model, String modelProperty, Object...args){
		this.model = model;
		this.modelProperty = modelProperty;
		modelGetterArgs = args;
		this.view = view;
		
		try {
			String modelGetName = "get" + Character.toString(modelProperty.charAt(0)).toUpperCase() + modelProperty.substring(1);
			if(args.length == 0){
				modelGetter = model.getClass().getMethod(modelGetName);
			}else{
				if(args.length == 1){
					modelGetter = model.getClass().getMethod(modelGetName, args[0].getClass());
				}else{
					throw new NotImplementedException();
				}
			}
			String value = modelGet().toString();
			view.setText(value);
			//listen to changes
			listener = new Object(){
				@Subscribe
				public void on(PropertyChangeEvent e){
					if(e.getPropertyName().equals(Binder.this.modelProperty)){
						String value;
						if(e.getNewValue() == null){
							value = modelGet().toString();
						}else{
							value = e.getNewValue().toString();
						}
						Binder.this.view.setText(value);
					}
				}
			};
			model.register(listener);
		} catch (Exception ex){
			throw new RuntimeException(ex);
		}
	}
	
	public Object modelGet(){
		try {
			if(modelGetterArgs.length == 0){
				return modelGetter.invoke(model);
			}else{
				if(modelGetterArgs.length == 1){
					return modelGetter.invoke(model, modelGetterArgs[0]);
				}else{
					throw new NotImplementedException();
				}
			}
		} catch (Exception ex){
			throw new RuntimeException(ex);
		}
	}
	
	protected void unbind(){
		model.unregister(listener);
	}
}
