package nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator;

import nl.heretichammer.draculareignofterrorremake.assets.AssetUtils;

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
		ObjectMap<String, AssetDescriptor> dependencies = new ObjectMap<String, AssetDescriptor>();
		ObjectMap<String, String> attributes = element.getAttributes();
		if(attributes.containsKey("skin")){
			AssetDescriptor<Skin> assetDescriptor = new AssetDescriptor<Skin>(element.get("skin"), Skin.class);
			dependencies.put(assetDescriptor.fileName, assetDescriptor);
		}else if(attributes.containsKey("style")){
			ObjectMap<String, String> styleAttributes = parseStyleAttributes(attributes.get("style"));
			if(styleAttributes.containsKey("font")){//required
				AssetDescriptor<BitmapFont> assetDescriptor = new AssetDescriptor<BitmapFont>(styleAttributes.get("font"), BitmapFont.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
			}
			if(styleAttributes.containsKey("fontcolor")){//required
				AssetDescriptor<BitmapFont> assetDescriptor = new AssetDescriptor<BitmapFont>(styleAttributes.get("font"), BitmapFont.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
			}
			if(styleAttributes.containsKey("background")){
				AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getAtlasFileName(styleAttributes.get("background")), TextureAtlas.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
			}
			if(styleAttributes.containsKey("disabledbackground")){
				AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getAtlasFileName(styleAttributes.get("disabledbackground")), TextureAtlas.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
			}
			if(styleAttributes.containsKey("focusedbackground")){
				AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getAtlasFileName(styleAttributes.get("focusedbackground")), TextureAtlas.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
			}
			if(styleAttributes.containsKey("selection")){
				AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getAtlasFileName(styleAttributes.get("selection")), TextureAtlas.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
			}
			if(styleAttributes.containsKey("messageFont")){
				AssetDescriptor<BitmapFont> assetDescriptor = new AssetDescriptor<BitmapFont>(styleAttributes.get("messageFont"), BitmapFont.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
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
		ObjectMap<String, String> styleAttributes = parseStyleAttributes(attributes);
		TextField.TextFieldStyle style = new TextField.TextFieldStyle();
			
		if(styleAttributes.containsKey("background")){
			style.background = actorLoader.getAsset(styleAttributes.get("background"), Drawable.class);
		}
		if(styleAttributes.containsKey("cursor")){
			style.cursor = actorLoader.getAsset(styleAttributes.get("cursor"), Drawable.class);
		}
		if(styleAttributes.containsKey("disabledbackground")){
			style.disabledBackground = actorLoader.getAsset(styleAttributes.get("disabledbackground"), Drawable.class);
		}
		if(styleAttributes.containsKey("disabledfontcolor")){
			style.disabledFontColor = ActorUtils.parseColor(styleAttributes.get("disabledfontcolor"));
		}
		if(styleAttributes.containsKey("focusedbackground")){
			style.focusedBackground = actorLoader.getAsset(styleAttributes.get("focusedbackground"), Drawable.class);
		}
		if(styleAttributes.containsKey("focusedfontcolor")){
			style.focusedFontColor = ActorUtils.parseColor(styleAttributes.get("focusedbackground"));
		}
		if(styleAttributes.containsKey("font")){
			style.font = actorLoader.getAsset(styleAttributes.get("font"), BitmapFont.class);
		}
		if(styleAttributes.containsKey("fontcolor")){
			style.fontColor = ActorUtils.parseColor(styleAttributes.get("fontcolor"));
		}
		if(styleAttributes.containsKey("messagefont")){
			style.messageFont = actorLoader.getAsset(styleAttributes.get("messagefont"), BitmapFont.class);
		}
		if(styleAttributes.containsKey("fontcolor")){
			style.fontColor = ActorUtils.parseColor(styleAttributes.get("fontcolor"));
		}
		if(styleAttributes.containsKey("selection")){
			style.selection = actorLoader.getAsset(styleAttributes.get("selection"), Drawable.class);
		}
		return style;
	}
}
