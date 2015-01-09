package nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator;

import nl.heretichammer.draculareignofterrorremake.assets.AssetUtils;

import com.badlogic.gdx.assets.AssetDescriptor;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.scenes.scene2d.ui.ImageButton;
import com.badlogic.gdx.scenes.scene2d.ui.ImageButton.ImageButtonStyle;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.scenes.scene2d.utils.Drawable;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader.Element;

public class ImageButtonCreator extends ButtonCreator<ImageButton>{

	public ImageButtonCreator(ActorLoader actorLoader) {
		super(actorLoader);
	}

	@Override
	public String getName() {
		return "imagebutton";
	}
	
	@SuppressWarnings("rawtypes")
	@Override
	public ObjectMap<String, AssetDescriptor> getDependencies(Element element) {
		ObjectMap<String, AssetDescriptor> dependencies = super.getDependencies(element);
		ObjectMap<String, String> attributes = element.getAttributes();
		if(attributes.containsKey("style")){
			String style = attributes.get("style");
			String[] args = style.replaceAll(SPACE, "").split(SEPERATOR);
			for(String arg : args){
				String[] keyval = arg.split("=");
				String key = keyval[0];
				String value = keyval[1];
				
				if(key.equalsIgnoreCase("imageChecked") || key.equalsIgnoreCase("imageCheckedOver") || key.equalsIgnoreCase("imageDisabled") || key.equalsIgnoreCase("imageDown") || key.equalsIgnoreCase("imageOver") || key.equalsIgnoreCase("imageUp")){
					AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getFileName(value), TextureAtlas.class);
					dependencies.put(assetDescriptor.fileName, assetDescriptor);
				}
			}
		}
		
		return dependencies;
	}
	
	@Override
	public ImageButton create(Element element, Object context) {
		ImageButton imageButton;
		ObjectMap<String, String> attributes = element.getAttributes();
		if(attributes != null){
			if(attributes.containsKey("skin")){
				Skin skin = actorLoader.getAsset(attributes.get("skin"), Skin.class);
				imageButton = new ImageButton(skin);
			}else if(attributes.containsKey("style")){
				ImageButton.ImageButtonStyle style = actorLoader.getStyle(attributes.get("style"), ImageButton.ImageButtonStyle.class);
				imageButton = new ImageButton(style);
			}else{
				imageButton = new ImageButton((Drawable)null);
			}
		}else{
			throw new IllegalArgumentException("imagebutton must have a skin or style set");
		}
		set(imageButton, element, context);
		return imageButton;
	}
	
	@Override
	public Class<?> getStyleType() {
		return ImageButton.ImageButtonStyle.class;
	}
	
	@Override
	public Object createStyle(String attributes) {
		ImageButton.ImageButtonStyle style = new ImageButtonStyle();
		setStyleProperties(style, attributes);
		for(String attribute : attributes.replaceAll(SPACE, "").split(",")){
			String[] args = attribute.split("=");
			String key = args[0];
			String value = args[1];
			
			if(key.equalsIgnoreCase("imageChecked")){
				style.imageChecked = actorLoader.getAsset(value, Drawable.class);
			}
			if(key.equalsIgnoreCase("imageCheckedOver")){
				style.imageCheckedOver = actorLoader.getAsset(value, Drawable.class);
			}
			if(key.equalsIgnoreCase("imageDisabled")){
				style.imageDisabled = actorLoader.getAsset(value, Drawable.class);
			}
			if(key.equalsIgnoreCase("imageDown")){
				style.imageDown = actorLoader.getAsset(value, Drawable.class);
			}
			if(key.equalsIgnoreCase("imageOver")){
				style.imageOver = actorLoader.getAsset(value, Drawable.class);
			}
			if(key.equalsIgnoreCase("imageUp")){
				style.imageUp = actorLoader.getAsset(value, Drawable.class);
			}
		}
		return style;
	};

	@Override
	protected void set(ImageButton actor, Element element, Object context) {
		super.set(actor, element, context);
	}
}
