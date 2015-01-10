package nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.badlogic.gdx.assets.AssetDescriptor;
import com.badlogic.gdx.assets.AssetLoaderParameters;
import com.badlogic.gdx.assets.AssetManager;
import com.badlogic.gdx.assets.loaders.AsynchronousAssetLoader;
import com.badlogic.gdx.assets.loaders.FileHandleResolver;
import com.badlogic.gdx.files.FileHandle;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.Sprite;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.badlogic.gdx.scenes.scene2d.Group;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.scenes.scene2d.ui.Table;
import com.badlogic.gdx.scenes.scene2d.ui.TextField;
import com.badlogic.gdx.scenes.scene2d.ui.Window;
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
	
	@SuppressWarnings("rawtypes")
	private Map<StyleDescriptor, Object> styles = new HashMap<StyleDescriptor, Object>();

	public ActorLoader(FileHandleResolver fileHandleResolver) {
		super(fileHandleResolver);
		addCreator(new GroupCreator<Group>(this));
		addCreator(new ImageCreator(this));
		addCreator(new TableCreator<Table>(this));
		addCreator(new LabelCreator(this));
		addCreator(new ImageButtonCreator(this));
		addCreator(new StackCreator(this));
		addCreator(new WindowCreator<Window>(this));
		addCreator(new TextFieldCreator<TextField>(this));
	}
	
	private void addCreator(ActorCreator<?> actorCreator){
		creators.put(actorCreator.getName(), actorCreator);
	}
	
	@Override
	public void loadAsync(AssetManager assetManager, String fileName, FileHandle file, ActorLoaderParameter parameter) {
		this.assetManager = assetManager;
		loaded = null;
		loaded = load(file, parameter.context);
		reset();
	}
	
	/**
	 * Reset temp values
	 */
	private void reset(){
		//clear styles
		styles.clear();
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
	public ObjectMap<String, AssetDescriptor> getDependencies(XmlReader.Element element){
		ActorCreator<?> creator = creators.get(element.getName());
		return creator.getDependencies(element);
	}
	
	private Actor load(FileHandle file, Object context){	
		String name = root.getName();
		return creators.get(name).create(root, context);
	}
	
	public Actor create(XmlReader.Element element, Object context){
		return creators.get(element.getName()).create(element, context);
	}
	
	@SuppressWarnings("unchecked")
	public <T> T getAsset(String fileName, Class<T> clazz){
		if(clazz == Drawable.class){
			if(fileName.equals("empty")){
				return (T) EMPTY;
			}
			String[] args = fileName.split(":");
			String file = args[0];
			String textureName = args[1];
			return (T) new TextureRegionDrawable( assetManager.get(file, TextureAtlas.class).findRegion(textureName) );
		}else if(clazz == Skin.class){
			return (T) assetManager.get(fileName, clazz);
		}else if(clazz == BitmapFont.class){
			if(fileName.endsWith(".fnt")){
				return (T) assetManager.get(fileName, BitmapFont.class);
			}else if(fileName.endsWith(".ttf")){
				throw new UnsupportedOperationException();
			}else{
				throw new UnsupportedOperationException();
			}
		}else{
			throw new UnsupportedOperationException();
		}
	}
	
	@SuppressWarnings("unchecked")
	public <T> T getStyle(String attributes, Class<T> clazz){
		StyleDescriptor<T> descriptor = new StyleDescriptor<T>(attributes, clazz);
		if(styles.containsKey(descriptor)){
			return (T)styles.get(descriptor);
		}else{
			T style = createStyle(attributes, clazz);
			styles.put(descriptor, style);
			return style;
		}
	}
	
	@SuppressWarnings("unchecked")
	private <T> T createStyle(String attributes, Class<T> clazz){ 
		for(ActorCreator<?> actorCreator : creators.values()){
			if(actorCreator.getStyleType() == clazz){
				T style = (T) actorCreator.createStyle(attributes);
				return style;
			}
		}
		throw new IllegalArgumentException();
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
	
	protected static class StyleDescriptor<T> {
		public final String style;
		public final Class<T> type;
		
		public StyleDescriptor (String style, Class<T> type) {
			this.style = style;
			this.type = type;
		}
		
		@Override
		public boolean equals(Object obj) {
			if(obj instanceof StyleDescriptor){
				@SuppressWarnings("rawtypes")
				StyleDescriptor other = (StyleDescriptor)obj;
				return this.style.equals(other.style) && this.type == other.type;
			}else{
				return super.equals(obj);
			}
		};
		
		@Override
		public int hashCode() {
			return style.hashCode();
		};
	}
}
