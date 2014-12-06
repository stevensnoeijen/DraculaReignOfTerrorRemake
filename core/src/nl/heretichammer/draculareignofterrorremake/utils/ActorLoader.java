package nl.heretichammer.draculareignofterrorremake.utils;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.tuple.Pair;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.assets.AssetDescriptor;
import com.badlogic.gdx.assets.AssetLoaderParameters;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.assets.loaders.AsynchronousAssetLoader;
import com.badlogic.gdx.assets.loaders.FileHandleResolver;
import com.badlogic.gdx.files.FileHandle;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.math.Rectangle;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.Group;
import com.badlogic.gdx.scenes.scene2d.ui.Image;
import com.badlogic.gdx.scenes.scene2d.utils.Drawable;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;
import com.badlogic.gdx.utils.Array;
import com.badlogic.gdx.utils.GdxRuntimeException;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader;


public class ActorLoader extends AsynchronousAssetLoader<Actor, ActorLoader.ActorLoaderParameter> {
	@SuppressWarnings("unchecked")
	private static Class<? extends Actor>[] LOAD_ACTORPARSER = new Class[] { Group.class, Image.class };
	
	private AssetManager assetManager;
	
	private XmlReader reader = new XmlReader();
	private XmlReader.Element root;
	private Actor loaded;
	
	private Map<String, Class<?>> dependencyProperties = new HashMap<>();
	private Map<String, ActorParser> actorParsers;

	public ActorLoader(FileHandleResolver fileHandleResolver) {
		super(fileHandleResolver);
		dependencyProperties.put("drawable", TextureAtlas.class);
		
		actorParsers = new HashMap<>();
		for(Class<? extends Actor> clazz : LOAD_ACTORPARSER){
			actorParsers.put(clazz.getSimpleName().toLowerCase(), new ActorParser(clazz));
		}
	}
	
	@Override
	public void loadAsync(AssetManager assetManager, String fileName, FileHandle file, ActorLoaderParameter parameter) {
		this.assetManager = assetManager;
		loaded = null;
		loaded = load(file);
	}

	@Override
	public Actor loadSync(AssetManager assetManager,	String fileName, FileHandle file, ActorLoaderParameter parameter) {
		return loaded;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public Array<AssetDescriptor> getDependencies(String fileName, FileHandle file, ActorLoaderParameter parameter) {
		try {
			this.root = reader.parse(file);
			return getDependencies(this.root);		
		} catch (IOException ex) {
			throw new GdxRuntimeException("Could't load layout '" + fileName + "'", ex);
		}
	}
	
	@SuppressWarnings("rawtypes")
	private Array<AssetDescriptor> getDependencies(XmlReader.Element element){
		Array<AssetDescriptor> dependencies = new Array<>();
		
		ObjectMap<String, String> elementAttributes = element.getAttributes();
		if(elementAttributes != null){//element has attributes
			for(String attribute : dependencyProperties.keySet()){
				if(elementAttributes.containsKey(attribute)){
					String attributeValue = elementAttributes.get(attribute);
					Class<?> type = dependencyProperties.get(attribute);
					if(type == TextureAtlas.class){
						attributeValue = attributeValue.split(":")[0];//only get atlas-file
					}
					dependencies.add(new AssetDescriptor<>(Gdx.files.internal(attributeValue), type));
				}
			}
		}
		
		//get dependencies from children
		int count = element.getChildCount();
		for(int i = 0; i < count; i++){
			dependencies.addAll(getDependencies(element.getChild(i)));//TODO: fix that there are also duplicates?
		}
		
		return dependencies;
	}
	
	private Actor load(FileHandle file){	
		String name = root.getName();
		ActorParser parser = actorParsers.get(name);
		Actor actor = parser.create(root);
		return actor;
	}
	
	private class ActorParser {
		
		private static final String ARGUMENT_SPLITTER = ",";

		private Class<? extends Actor> clazz;
		
		//private Map<Pair<String, Integer>, ActorConstructor> constructors
		/**
		 * Key is name of the property and number of parameters
		 */
		private Map<Pair<String, Integer>, Setter> setters = new HashMap<>();
		private Map<String, Adder> adders = new HashMap<>();
		
		@SuppressWarnings("unchecked")
		public ActorParser(Class<? extends Actor> clazz) {
			this.clazz = clazz;
			for (; clazz != null; clazz = (Class<? extends Actor>) clazz.getSuperclass()) {//TODO: check if to replace with an own (abstract) ActorParser
				for(Method method : clazz.getDeclaredMethods()){
					String name = method.getName();
					if(Modifier.isPublic(method.getModifiers())){
						String setterName = name.replaceFirst("set", "").toLowerCase();
						if(name.startsWith("set") && !name.contains("Stage") && !(clazz == Image.class && setterName.equals("drawable"))){//get setters except stage or image.background
							Setter setter = new Setter(method);
							setters.put(Pair.of(setterName, setter.getParameterCount()), setter);
						}else if(name.equals("addActor")){//TODO: make this more generic (also with the other addActor* methods)
							Adder adder = new Adder(method);
							adders.put(name.replaceFirst("add", "").toLowerCase(), adder);
						}
					}
				}
			}
		}
		
		public Actor create(XmlReader.Element element){
			try {
				Actor actor;
				if(clazz == Image.class){
					actor= clazz.getConstructor(Drawable.class).newInstance( parse(element.getAttribute("drawable"), Drawable.class) );
				}else{
					actor = clazz.newInstance();//TODO: check if constructor must parameters
				}
				ObjectMap<String, String> attributes = element.getAttributes();
				if(attributes != null){
					for(String key : attributes.keys()){
						String value = element.get(key);
						String[] args = value.split(ARGUMENT_SPLITTER);
						Setter setter = setters.get(Pair.of(key, args.length));
						if(setter != null){//if setter exist
							setter.set(actor, value);
						}
					}
				}
				int count = element.getChildCount();
				for(int i = 0; i < count; i++){
					add(actor, element.getChild(i));
				}
				return actor;
			} catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException | NoSuchMethodException | SecurityException ex) {
				throw new RuntimeException(ex);
			}
		}
		
		private void add(Actor actor, XmlReader.Element element){
			String name = element.getName();
			name = name.substring(0, name.length()-1);//adder name
			if(adders.containsKey(name)){
				Adder adder = adders.get(name);
				int count = element.getChildCount();
				for(int i = 0; i < count; i++){
					XmlReader.Element child = element.getChild(i);
					
					ActorParser parser = actorParsers.get(child.getName());
					Actor content = parser.create(child);
					
					adder.add(actor, content);//TODO: add actions
				}
			}
		}
		
		@Override
		public String toString() {
			return clazz.getSimpleName();
		}
		
		
		@SuppressWarnings({ "unchecked", "rawtypes" })
		private <T> T parse(String value, Class<T> clazz){
			if(clazz.isArray()){
				Class<?> component = clazz.getComponentType();//item in array
				String[] values = value.split(ARGUMENT_SPLITTER);
				
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
					String[] values = value.split(ARGUMENT_SPLITTER);
					return (T) new Rectangle(Float.parseFloat(values[0]), Float.parseFloat(values[1]), Float.parseFloat(values[2]), Float.parseFloat(values[3]));
				}else if(clazz == Drawable.class){
					String[] args = value.split(":");
					String file = args[0];
					String textureName = args[1];
					
					return (T) new TextureRegionDrawable( assetManager.get(file, TextureAtlas.class).findRegion(textureName) );
				}else{
					return null;
				}
				//FIXME: add drawable
			}
		}
		
		private class Setter {
			private Method method;
			
			public Setter(Method method) {
				this.method = method;
			}
			
			public int getParameterCount(){
				return method.getParameterCount();
			}
			
			public void set(Actor actor, String...values){
				try {
					Object[] args = new Object[values.length];//parsed values
					for(int i = 0; i < values.length; i++){
						args[i] = parse(values[i], method.getParameterTypes()[i]);
					}
					method.invoke(actor, args);
				} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException ex) {
					throw new RuntimeException(ex);
				}
			}
			
			@Override
			public String toString() {
				return method.toString();
			}
		}
		
		private class Adder {
			private Method method;
			
			public Adder(Method method){
				this.method = method;
			}
			
			public void add(Actor actor, Actor content){
				try {
					method.invoke(actor, content);
				} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException ex) {
					throw new RuntimeException(ex);
				}
			}
			
			@Override
			public String toString() {
				return method.toString();
			};
		}
	}
	
	
	public static class ActorLoaderParameter extends AssetLoaderParameters<Actor> {
		
	}
}
