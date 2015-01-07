package nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator;

import nl.heretichammer.draculareignofterrorremake.assets.AssetUtils;
import nl.heretichammer.draculareignofterrorremake.assets.loaders.ActorLoader;

import com.badlogic.gdx.assets.AssetDescriptor;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.scenes.scene2d.ui.TextField;
import com.badlogic.gdx.scenes.scene2d.utils.Drawable;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader.Element;

public class TextFieldCreator<T extends TextField> extends WidgetCreator<T> {
	public TextFieldCreator(ActorLoader actorLoader) {
		super(actorLoader);
	}
	
	public String getName() {
		return "textfield";
	};
	
	@SuppressWarnings("rawtypes")
	@Override
	public ObjectMap<String,AssetDescriptor> getDependencies(Element element) {
		ObjectMap<String, AssetDescriptor> dependencies = super.getDependencies(element);
		ObjectMap<String, String> attributes = element.getAttributes();
		if(attributes.containsKey("skin")){
			AssetDescriptor<Skin> assetDescriptor = new AssetDescriptor<Skin>(element.get("skin"), Skin.class);
			dependencies.put(assetDescriptor.fileName, assetDescriptor);
		}else if(attributes.containsKey("style")){
			String style = attributes.get("style");
			String[] args = style.replaceAll(SPACE, "").split(SEPERATOR);
			for(String arg : args){
				String[] keyval = arg.split("=");
				String key = keyval[0];
				String value = keyval[1];
				
				if(key.equals("background") || key.equals("key") || key.equals("disabledbackground") || key.equals("focusedbackground") || key.equals("selection")){
					AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getFileName(value), TextureAtlas.class);
					dependencies.put(assetDescriptor.fileName, assetDescriptor);
				}
				if(key.equals("font") || key.equals("messageFont")){
					AssetDescriptor<BitmapFont> assetDescriptor = new AssetDescriptor<BitmapFont>(value, BitmapFont.class);
					dependencies.put(assetDescriptor.fileName, assetDescriptor);
				}
			}
		}
		return dependencies;
	};
	
	@SuppressWarnings("unchecked")
	@Override
	public T create(Element element, Object context) {
		ObjectMap<String, String> attributes = element.getAttributes();
		TextField textField = null;
		String text = "";
		if(attributes.containsKey("text")){
			text = attributes.get("text");
		}
		if(attributes.containsKey("skin")){
			Skin skin =  actorLoader.getAsset(element.get("skin"), Skin.class);
			textField = new TextField(text, skin);
		}else if(attributes.containsKey("style")){
			TextField.TextFieldStyle style = actorLoader.getStyle(attributes.get("style"), TextField.TextFieldStyle.class);
			textField = new TextField(text, style);
		}
		set(textField, element, context);
		return (T) textField;	
	}
	
	@SuppressWarnings("unchecked")
	@Override
	protected void set(TextField textField, Element element, Object context) {
		super.set((T)textField, element, context);
	}
	
	@Override
	public Class<?> getStyleType() {
		return TextField.TextFieldStyle.class;
	};
	
	@Override
	public Object createStyle(String attributes) {
		attributes = attributes.replaceAll(SPACE, "");
		TextField.TextFieldStyle style = new TextField.TextFieldStyle();
		for(String attribute : attributes.split(",")){
			String[] args = attribute.split("=");
			String key = args[0];
			String value = args[1];
			
			if(key.equals("background")){
				style.background = actorLoader.getAsset(value, Drawable.class);
			}
			if(key.equals("cursor")){
				style.cursor = actorLoader.getAsset(value, Drawable.class);
			}
			if(key.equalsIgnoreCase("disabledBackground")){
				style.disabledBackground = actorLoader.getAsset(value, Drawable.class);
			}
			if(key.equalsIgnoreCase("disabledFontColor")){
				style.disabledFontColor = AssetUtils.parseColor(value);
			}
			if(key.equalsIgnoreCase("focusedBackground")){
				style.focusedBackground = actorLoader.getAsset(value, Drawable.class);
			}
			if(key.equalsIgnoreCase("focusedFontColor")){
				style.focusedFontColor = AssetUtils.parseColor(value);
			}
			if(key.equals("font")){
				style.font = actorLoader.getAsset(value, BitmapFont.class);
			}
			if(key.equalsIgnoreCase("fontcolor")){
				style.fontColor = AssetUtils.parseColor(value);
			}
			if(key.equalsIgnoreCase("messageFont")){
				style.messageFont = actorLoader.getAsset(value, BitmapFont.class);
			}
			if(key.equalsIgnoreCase("selection")){
				style.selection = actorLoader.getAsset(value, Drawable.class);
			}
		}
		return style;
	}
}
