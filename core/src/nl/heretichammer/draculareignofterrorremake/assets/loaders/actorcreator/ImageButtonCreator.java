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
			ObjectMap<String, String> styleAttributes = parseStyleAttributes(attributes.get("style"));
			if(styleAttributes.containsKey("imagechecked")){
				AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getAtlasFileName(styleAttributes.get("imagechecked")), TextureAtlas.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
			}
			if(styleAttributes.containsKey("imagecheckedover")){
				AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getAtlasFileName(styleAttributes.get("imagecheckedover")), TextureAtlas.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
			}
			if(styleAttributes.containsKey("imagedisabled")){
				AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getAtlasFileName(styleAttributes.get("imagedisabled")), TextureAtlas.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
			}
			if(styleAttributes.containsKey("imagedown")){
				AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getAtlasFileName(styleAttributes.get("imagedown")), TextureAtlas.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
			}
			if(styleAttributes.containsKey("imageover")){
				AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getAtlasFileName(styleAttributes.get("imageover")), TextureAtlas.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
			}
			if(styleAttributes.containsKey("imageup")){
				AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getAtlasFileName(styleAttributes.get("imageup")), TextureAtlas.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
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
		ObjectMap<String, String> styleAttributes = parseStyleAttributes(attributes);
		
		ImageButton.ImageButtonStyle style = new ImageButtonStyle();
		setStyleProperties(style, styleAttributes);
			
		if(styleAttributes.containsKey("imagechecked")){
			style.imageChecked = actorLoader.getAsset(styleAttributes.get("imagechecked"), Drawable.class);
		}
		if(styleAttributes.containsKey("imagecheckedover")){
			style.imageCheckedOver = actorLoader.getAsset(styleAttributes.get("imagecheckedover"), Drawable.class);
		}
		if(styleAttributes.containsKey("imagedisabled")){
			style.imageDisabled = actorLoader.getAsset(styleAttributes.get("imagedisabled"), Drawable.class);
		}
		if(styleAttributes.containsKey("imagedown")){
			style.imageDown = actorLoader.getAsset(styleAttributes.get("imagedown"), Drawable.class);
		}
		if(styleAttributes.containsKey("imageover")){
			style.imageOver = actorLoader.getAsset(styleAttributes.get("imageover"), Drawable.class);
		}
		if(styleAttributes.containsKey("imageup")){
			style.imageUp = actorLoader.getAsset(styleAttributes.get("imageup"), Drawable.class);
		}
		
		return style;
	};

	@Override
	protected void set(ImageButton actor, Element element, Object context) {
		super.set(actor, element, context);
	}
}
