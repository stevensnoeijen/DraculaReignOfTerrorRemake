package nl.heretichammer.draculareignofterrorremake.view;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.utils.AssetHelper;

import com.badlogic.gdx.files.FileHandle;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.Group;
import com.badlogic.gdx.scenes.scene2d.ui.Image;
import com.badlogic.gdx.scenes.scene2d.utils.Drawable;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader;
import com.badlogic.gdx.utils.XmlReader.Element;

public class ActorParser {
	private AssetHelper assetHelper;
	
	private Map<String, Class<? extends Actor>> classes;
	private Map<String, Class<?>> formats;
	
	public ActorParser() {
		classes = new HashMap<>();
		classes.put("group", Group.class);
		classes.put("image", Image.class);
		
		formats = new HashMap<>();
		formats.put("name", String.class);
		formats.put("drawable", Drawable.class);
	}
	
	public Group parse(FileHandle file) {
		XmlReader reader = new XmlReader();
		try{
			Element element = reader.parse(file);
			Group group = (Group)parse(element);
			return group;
		}catch(IOException | InstantiationException | IllegalAccessException | NoSuchMethodException | SecurityException | IllegalArgumentException | InvocationTargetException ex){
			throw new RuntimeException(ex);
		}
	}
	
	private Actor parse(Element element) throws InstantiationException, IllegalAccessException, NoSuchMethodException, SecurityException, IllegalArgumentException, InvocationTargetException{
		String name = element.getName();
		Class<?> clazz = classes.get(name);
		Object actor = clazz.newInstance();
		
		ObjectMap<String, String> attributes = element.getAttributes();
		if(attributes != null){
			for(String key : attributes.keys()){
				String value = element.get(key);
				String setterName = "set" + Character.toUpperCase(key.charAt(0)) + key.substring(1);
				Class paramaterType = formats.get(key);
				Method setter = clazz.getMethod(setterName, paramaterType);
				setter.invoke(actor, parse(value, paramaterType));
			}
		}
		if(actor instanceof Group){
			Group group = (Group)actor;
			for(int i = 0; i < element.getChildCount(); i++){
				element = element.getChild(i);
				Actor inner = parse(element);
				group.addActor(inner);
			}
		}		
		return (Actor)actor;
	}
	
	private <T> T parse(String value, Class<T> clazz){
		if(clazz == String.class){
			return (T)value;
		}else if(clazz == Drawable.class){
			return (T) new TextureRegionDrawable(assetHelper.getAtlasRegion(value));
		}else{
			throw new UnsupportedOperationException();
		}
	}
	
	public void setAssetHelper(AssetHelper assetHelper) {
		this.assetHelper = assetHelper;
	}
}
