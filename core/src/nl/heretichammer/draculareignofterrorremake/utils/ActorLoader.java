package nl.heretichammer.draculareignofterrorremake.utils;

import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.utils.actorcreator.ActorCreator;
import nl.heretichammer.draculareignofterrorremake.utils.actorcreator.GroupCreator;
import nl.heretichammer.draculareignofterrorremake.utils.actorcreator.ImageButtonCreator;
import nl.heretichammer.draculareignofterrorremake.utils.actorcreator.ImageCreator;
import nl.heretichammer.draculareignofterrorremake.utils.actorcreator.LabelCreator;
import nl.heretichammer.draculareignofterrorremake.utils.actorcreator.TableCreator;

import org.apache.commons.lang3.tuple.Pair;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.assets.AssetDescriptor;
import com.badlogic.gdx.assets.AssetLoaderParameters;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.assets.loaders.AsynchronousAssetLoader;
import com.badlogic.gdx.assets.loaders.FileHandleResolver;
import com.badlogic.gdx.files.FileHandle;
import com.badlogic.gdx.graphics.Color;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.math.Rectangle;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.Group;
import com.badlogic.gdx.scenes.scene2d.ui.Image;
import com.badlogic.gdx.scenes.scene2d.ui.ImageButton;
import com.badlogic.gdx.scenes.scene2d.ui.Label;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.scenes.scene2d.ui.Table;
import com.badlogic.gdx.scenes.scene2d.utils.Drawable;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;
import com.badlogic.gdx.utils.Array;
import com.badlogic.gdx.utils.GdxRuntimeException;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader;
import com.badlogic.gdx.utils.XmlReader.Element;


public class ActorLoader extends AsynchronousAssetLoader<Actor, ActorLoader.ActorLoaderParameter> {
	private ObjectMap<String, ActorCreator<?>> creators;
	
	@SuppressWarnings("unchecked")
	private static Class<? extends Actor>[] LOAD_ACTOR_PARSERS = new Class[] { Group.class, Image.class, ImageButton.class, Label.class, Table.class };
	
	private AssetManager assetManager;
	
	private XmlReader reader = new XmlReader();
	private XmlReader.Element root;
	private Actor loaded;
	
	private Map<String, Class<?>> dependencyProperties = new HashMap<>();
	private Map<String, ActorParser> actorParsers;

	public ActorLoader(FileHandleResolver fileHandleResolver) {
		super(fileHandleResolver);
		creators = new ObjectMap<>();
		creators.put("group", new GroupCreator(this));
		creators.put("image", new ImageCreator(this));
		creators.put("table", new TableCreator<Table>(this));
		creators.put("label", new LabelCreator(this));
		creators.put("imagebutton", new ImageButtonCreator(this));
		
		dependencyProperties.put("drawable", TextureAtlas.class);
		dependencyProperties.put("skin", Skin.class);
		
		actorParsers = new HashMap<>();
		for(Class<? extends Actor> clazz : LOAD_ACTOR_PARSERS){
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
		return creators.get(name).create(root);
	}
	
	public Actor create(XmlReader.Element element){
		return creators.get(element.getName()).create(element);
	}
	
	public <T> T getLoadedAsset(String fileName, Class<T> clazz){
		return parse(fileName, clazz);//TODO: replace with assetmanager call
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public <T> T parse(String value, Class<T> clazz){
		if(clazz.isArray()){
			Class<?> component = clazz.getComponentType();//item in array
			String[] values = value.replaceAll("\\s", "").split(",");
			
			T parsed = (T) java.lang.reflect.Array.newInstance(component, values.length);
			for(int i = 0; i < values.length; i++){
				java.lang.reflect.Array.set(parsed, i, parse(values[i], component));
			}
			return parsed;
		}else{
			if(clazz == String.class || clazz == CharSequence.class){
				return (T)value;
			}else if(clazz.isEnum()){
				return (T) Enum.valueOf((Class<Enum>)clazz, value);
			}else if(clazz == Integer.class){
				return (T) new Integer(value);
			}else if(clazz == Float.TYPE){
				return (T) new Float(value);
			}else if(clazz == Boolean.class){
				return (T) new Boolean(value);
			}else if(clazz == Rectangle.class){
				String[] args = value.split(",");
				return (T) new Rectangle(Float.parseFloat(args[0]), Float.parseFloat(args[1]), Float.parseFloat(args[2]), Float.parseFloat(args[3]));
			}else if(clazz == Drawable.class){
				String[] args = value.split(":");
				String file = args[0];
				String textureName = args[1];
				return (T) new TextureRegionDrawable( assetManager.get(file, TextureAtlas.class).findRegion(textureName) );
			}else if(clazz == Skin.class){
				return (T) assetManager.get(value, Skin.class);
			}else if(clazz == Color.class){
				try {
					return (T) Color.class.getField(value.toUpperCase()).get(null);
				} catch (NoSuchFieldException | SecurityException | IllegalArgumentException | IllegalAccessException ex) {
					throw new RuntimeException(ex);
				}
			}else{
				return null;
			}
			//FIXME: add drawable
		}
	}
	
	private class ActorStyleParser<T> {
		private Class<T> clazz;
		private Field[] fields;
		
		public ActorStyleParser(Class<T> clazz) {
			this.clazz = clazz;
			fields = clazz.getFields();			
		}

		public T create(XmlReader.Element element) {
			try {
				T style = clazz.newInstance();
				ObjectMap<String, String> attributes = element.getAttributes();
				for(Field field : fields){
					String fieldName = field.getName();
					if(attributes.containsKey(fieldName)){
						field.set(style, parse(attributes.get(fieldName), field.getType()));
					}
				}				
				return style;
			} catch (InstantiationException | IllegalAccessException ex) {
				throw new RuntimeException(ex);
			}
		}
	}
	
	private class ActorParser {
		
		private static final String ARGUMENT_SPLITTER = ",";

		private Class<? extends Actor> clazz;
		
		
		private ActorStyleParser<?> actorStyleParser;
		/**
		 * Key is name of the property and number of parameters
		 */
		private Map<Pair<String, Integer>, Setter> setters = new HashMap<>();
		private Map<String, Adder> adders = new HashMap<>();
		
		@SuppressWarnings("unchecked")
		public ActorParser(Class<? extends Actor> clazz) {
			this.clazz = clazz;
			//create setters and adders
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
						}else if(name.equals("row")){
							
						}
					}
				}
			}
			
			if(this.clazz == ImageButton.class){
				actorStyleParser = new ActorStyleParser<ImageButton.ImageButtonStyle>(ImageButton.ImageButtonStyle.class);
			}			
		}
		
		private Actor construct(XmlReader.Element element){
			try {
				Actor actor;
				if(clazz == Image.class){//TODO: put this in the constructor
					actor = clazz.getConstructor(Drawable.class).newInstance( parse(element.getAttribute("drawable"), Drawable.class) );
				}else if(clazz == ImageButton.class){
					XmlReader.Element styleElement = element.getChildByName("style");
					ImageButton.ImageButtonStyle style = (ImageButton.ImageButtonStyle) actorStyleParser.create(styleElement);
					actor = clazz.getConstructor(ImageButton.ImageButtonStyle.class).newInstance(style);
				}else if(clazz == Label.class){
					actor = clazz.getConstructor(CharSequence.class, Skin.class).newInstance( (CharSequence)element.getAttribute("text"), parse(element.getAttribute("skin"), Skin.class));
				}else{
					actor = clazz.newInstance();//TODO: check if constructor must parameters
				}
				return actor;
			} catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException | NoSuchMethodException | SecurityException ex) {
				throw new RuntimeException(ex);
			}
		}
		
		public Actor create(XmlReader.Element element){
			try {
				Actor actor = construct(element);
				//set attributes
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
					Element child = element.getChild(i);
					String childName = child.getName();
					if(childName.equals("actors") || childName.equals("rows")){
						add(actor, child);
					}else{
						throw new UnsupportedOperationException();
					}
				}
				return actor;
			} catch (IllegalArgumentException | SecurityException ex) {
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
