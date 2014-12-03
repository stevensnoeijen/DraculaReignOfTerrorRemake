package nl.heretichammer.draculareignofterrorremake.utils;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.Map;

import com.badlogic.gdx.assets.AssetDescriptor;
import com.badlogic.gdx.assets.AssetLoaderParameters;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.assets.loaders.AsynchronousAssetLoader;
import com.badlogic.gdx.assets.loaders.FileHandleResolver;
import com.badlogic.gdx.files.FileHandle;
import com.badlogic.gdx.math.Rectangle;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.Group;
import com.badlogic.gdx.scenes.scene2d.ui.Image;
import com.badlogic.gdx.utils.Array;
import com.badlogic.gdx.utils.GdxRuntimeException;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader;
import com.badlogic.gdx.utils.XmlReader.Element;

public class ActorLoader extends AsynchronousAssetLoader<Actor, ActorLoader.ActorLoaderParameter> {
	@SuppressWarnings("unchecked")
	private static Class<? extends Actor>[] LOAD_ACTORPARSER = new Class[] { Group.class, Image.class };
	
	private XmlReader reader = new XmlReader();
	private XmlReader.Element root;
	private Actor loaded;
	
	private Map<String, ActorParser> actorParsers;

	public ActorLoader(FileHandleResolver fileHandleResolver) {
		super(fileHandleResolver);
		actorParsers = new HashMap<>();
		for(Class<? extends Actor> clazz : LOAD_ACTORPARSER){
			actorParsers.put(clazz.getSimpleName().toLowerCase(), new ActorParser(clazz));
		}
	}
	
	@Override
	public void loadAsync(AssetManager manager,	String fileName, FileHandle file, ActorLoaderParameter parameter) {
		loaded = null;
		loaded = load(file);
	}

	@Override
	public Actor loadSync(AssetManager manager,	String fileName, FileHandle file, ActorLoaderParameter parameter) {
		return loaded;
	}

	@Override
	public Array<AssetDescriptor> getDependencies(String fileName, FileHandle file, ActorLoaderParameter parameter) {
		try {
			root = reader.parse(file);
			return null;
			//return getDependencies(root);
		} catch (IOException ex) {
			throw new GdxRuntimeException("Could't load layout '" + fileName + "'", ex);
		}
	}
	
	private Array<AssetDescriptor> getDependencies(XmlReader.Element element){
		/*Array<AssetDescriptor> assets = new Array<>();
		
		ObjectMap<String, String> attributes = element.getAttributes();
		if(attributes != null){
			for(String key : attributes.keys()){
				if(formats.containsKey(key)){
					
				}
			}
		}
		return assets;
		*/
		return null;
	}
	
	private Actor load(FileHandle file){	
		String name = root.getName();
		ActorParser parser = actorParsers.get(name);
		Actor actor = parser.create(root);
		return actor;
	}
	
	private static class ActorParser {
		
		private Class<? extends Actor> clazz;
		private Map<String, PropertyParser> propertyParsers = new HashMap<>();
		
		@SuppressWarnings("unchecked")
		public ActorParser(Class<? extends Actor> clazz) {
			this.clazz = clazz;
			for (; clazz != null; clazz = (Class<? extends Actor>) clazz.getSuperclass()) {//TODO: check if to replace with an own (abstract) ActorParser
				for(Method method : clazz.getDeclaredMethods()){
					String name = method.getName();
					if(Modifier.isPublic(method.getModifiers()) && ( name.startsWith("set") && !name.contains("Stage"))){
						PropertyParser propertyParser = new PropertyParser(method);
						propertyParsers.put(name.replaceFirst("set", "").toLowerCase(), propertyParser);
					}
				}
			}
		}
		
		public Actor create(Element element){
			try {
				Actor actor = clazz.newInstance();//TODO: check if constructor must parameters
				ObjectMap<String, String> attributes = element.getAttributes();
				if(attributes != null){
					for(String key : attributes.keys()){
						String value = element.get(key);
						PropertyParser propertyParser = propertyParsers.get(key);
						propertyParser.set(actor, value);
					}
				}
				return actor;
			} catch (InstantiationException | IllegalAccessException ex) {
				throw new RuntimeException(ex);
			}
		}
		
		@Override
		public String toString() {
			return clazz.getSimpleName();
		}
		
		private static class PropertyParser {
			private Method method;
			
			public PropertyParser(Method method) {
				this.method = method;
			}
			
			public void set(Actor actor, String value){
				try {
					method.invoke(actor, parse(value, method.getParameterTypes()[0]));
				} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException ex) {
					throw new RuntimeException(ex);
				}
			}
			
			@SuppressWarnings({ "unchecked", "rawtypes" })
			private <T> T parse(String value, Class<T> clazz){
				if(clazz.isArray()){
					Class<?> component = clazz.getComponentType();//item in array
					String[] values = value.split(",");
					
					T parsed = (T) java.lang.reflect.Array.newInstance(component, values.length);
					for(int i = 0; i < values.length; i++){
						java.lang.reflect.Array.set(parsed, i, parse(values[i], component));
					}
					return parsed;
				}else{
					if(clazz == String.class){
						return (T)value;
					}else if(clazz.isEnum()){
						return (T) Enum.valueOf((Class<Enum>)clazz, value);
					}else if(clazz == Integer.class){
						return (T) new Integer(value);
					}else if(clazz == Float.class){
						return (T) new Float(value);
					}else if(clazz == Boolean.class){
						return (T) new Boolean(value);
					}else if(clazz == Rectangle.class){
						String[] values = value.split(",");
						return (T) new Rectangle(Float.parseFloat(values[0]), Float.parseFloat(values[1]), Float.parseFloat(values[2]), Float.parseFloat(values[3]));
					}else{
						return null;
					}
					//FIXME: add drawable
				}
			}
		}
	}
	
	
	public static class ActorLoaderParameter extends AssetLoaderParameters<Actor> {
		
	}
}
