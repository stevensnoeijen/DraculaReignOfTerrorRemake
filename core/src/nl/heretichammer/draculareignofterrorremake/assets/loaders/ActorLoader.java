package nl.heretichammer.draculareignofterrorremake.assets.loaders;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator.ActorCreator;
import nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator.GroupCreator;
import nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator.ImageButtonCreator;
import nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator.ImageCreator;
import nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator.LabelCreator;
import nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator.StackCreator;
import nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator.TableCreator;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.assets.AssetDescriptor;
import com.badlogic.gdx.assets.AssetLoaderParameters;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.assets.loaders.AsynchronousAssetLoader;
import com.badlogic.gdx.assets.loaders.FileHandleResolver;
import com.badlogic.gdx.files.FileHandle;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.Sprite;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.Group;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.scenes.scene2d.ui.Table;
import com.badlogic.gdx.scenes.scene2d.utils.Drawable;
import com.badlogic.gdx.scenes.scene2d.utils.SpriteDrawable;
import com.badlogic.gdx.scenes.scene2d.utils.TextureRegionDrawable;
import com.badlogic.gdx.utils.Array;
import com.badlogic.gdx.utils.GdxRuntimeException;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader;


public class ActorLoader extends AsynchronousAssetLoader<Actor, ActorLoader.ActorLoaderParameter> {
	/**
	 * A empty drawable, used when the disabled image is in the background.
	 */
	public static Drawable EMPTY = new SpriteDrawable( new Sprite( new Texture(1, 1, Pixmap.Format.Alpha) ) );
	
	private ObjectMap<String, ActorCreator<?>> creators = new ObjectMap<String, ActorCreator<?>>();
	
	private AssetManager assetManager;
	
	private XmlReader reader = new XmlReader();
	private XmlReader.Element root;
	private Actor loaded;
	
	private Map<String, Class<?>> dependencyProperties = new HashMap<String, Class<?>>();

	public ActorLoader(FileHandleResolver fileHandleResolver) {
		super(fileHandleResolver);
		creators.put("group", new GroupCreator<Group>(this));
		creators.put("image", new ImageCreator(this));
		creators.put("table", new TableCreator<Table>(this));
		creators.put("label", new LabelCreator(this));
		creators.put("imagebutton", new ImageButtonCreator(this));
		creators.put("stack", new StackCreator(this));
		
		dependencyProperties.put("drawable", TextureAtlas.class);
		dependencyProperties.put("skin", Skin.class);
	}
	
	@Override
	public void loadAsync(AssetManager assetManager, String fileName, FileHandle file, ActorLoaderParameter parameter) {
		this.assetManager = assetManager;
		loaded = null;
		loaded = load(file, parameter.context);
		//reset creators
		for(ActorCreator<?> creator : creators.values()){
			creator.reset();
		}
	}

	@Override
	public Actor loadSync(AssetManager assetManager, String fileName, FileHandle file, ActorLoaderParameter parameter) {
		return loaded;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public Array<AssetDescriptor> getDependencies(String fileName, FileHandle file, ActorLoaderParameter parameter) {
		try {
			this.root = reader.parse(file);
			return getDependencies(this.root).values().toArray();		
		} catch (IOException ex) {
			throw new GdxRuntimeException("Could't load layout '" + fileName + "'", ex);
		}
	}
	
	@SuppressWarnings("rawtypes")
	private ObjectMap<String, AssetDescriptor> getDependencies(XmlReader.Element element){
		ObjectMap<String, AssetDescriptor> dependencies = new ObjectMap<String, AssetDescriptor>();
		
		ObjectMap<String, String> elementAttributes = element.getAttributes();
		if(elementAttributes != null){//element has attributes
			for(String attribute : dependencyProperties.keySet()){
				if(elementAttributes.containsKey(attribute)){
					String attributeValue = elementAttributes.get(attribute);
					Class<?> type = dependencyProperties.get(attribute);
					if(type == TextureAtlas.class){
						attributeValue = attributeValue.split(":")[0];//only get atlas-file
					}
					dependencies.put(attributeValue, new AssetDescriptor(Gdx.files.internal(attributeValue), type));
				}
			}
		}
		
		//get dependencies from children
		int count = element.getChildCount();
		for(int i = 0; i < count; i++){
			dependencies.putAll(getDependencies(element.getChild(i)));//TODO: fix that there are also duplicates?
		}
		
		return dependencies;
	}
	
	private Actor load(FileHandle file, Object context){	
		String name = root.getName();
		return creators.get(name).create(root, context);
	}
	
	public Actor create(XmlReader.Element element, Object context){
		return creators.get(element.getName()).create(element, context);
	}
	
	@SuppressWarnings("unchecked")
	public <T> T getLoadedAsset(String fileName, Class<T> clazz){
		if(clazz == Drawable.class){
			if(fileName.equals("empty")){
				return (T) EMPTY;
			}
			
			String[] args = fileName.split(":");
			String file = args[0];
			String textureName = args[1];
			return (T) new TextureRegionDrawable( assetManager.get(file, TextureAtlas.class).findRegion(textureName) );
		}else if(clazz == Skin.class){
			return (T) assetManager.get(fileName, Skin.class);
		}else{
			throw new UnsupportedOperationException();
		}
	}
	
	public static class ActorLoaderParameter extends AssetLoaderParameters<Actor> {
		/**
		 * For handling click events
		 */
		public Object context;
		
		public ActorLoaderParameter(Object context) {
			this.context = context;
		}
	}
}
