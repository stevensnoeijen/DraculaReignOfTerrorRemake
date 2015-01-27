package nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator;

import nl.heretichammer.draculareignofterrorremake.assets.AssetUtils;

import com.badlogic.gdx.assets.AssetDescriptor;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.TextureAtlas;
import com.badlogic.gdx.scenes.scene2d.ui.ProgressBar;
import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.scenes.scene2d.utils.Drawable;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader.Element;

public class ProgressBarCreator<T extends ProgressBar> extends WidgetCreator<T> {

	public ProgressBarCreator(ActorLoader actorLoader) {
		super(actorLoader);
	}

	@Override
	public String getName() {
		return "progressbar";
	}

	@Override
	public ObjectMap<String, AssetDescriptor> getDependencies(Element element) {
		ObjectMap<String, String> attributes = element.getAttributes();
		ObjectMap<String, AssetDescriptor> dependencies = new ObjectMap<String, AssetDescriptor>();
		if(attributes.containsKey("skin")){
			AssetDescriptor<?> assetDescriptor = new AssetDescriptor<Skin>(attributes.get("skin"), Skin.class);
			dependencies.put(assetDescriptor.fileName, assetDescriptor);
		}else if(attributes.containsKey("style")){
			ObjectMap<String, String> styleAttributes = parseStyleAttributes(attributes.get("style"));
			if(styleAttributes.containsKey("backbround")){//required
				AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getAtlasFileName(styleAttributes.get("background")), TextureAtlas.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
			}
			if(styleAttributes.containsKey("disabledbackground")){//required
				AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getAtlasFileName(styleAttributes.get("disabledbackground")), TextureAtlas.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
			}
			if(styleAttributes.containsKey("disabledknob")){//required
				AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getAtlasFileName(styleAttributes.get("disabledknob")), TextureAtlas.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
			}
			
			if(styleAttributes.containsKey("backbround")){//required
				AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getAtlasFileName(styleAttributes.get("background")), TextureAtlas.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
			}
			
			if(styleAttributes.containsKey("backbround")){//required
				AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getAtlasFileName(styleAttributes.get("background")), TextureAtlas.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
			}
			
			if(styleAttributes.containsKey("backbround")){//required
				AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getAtlasFileName(styleAttributes.get("background")), TextureAtlas.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
			}
			
			if(styleAttributes.containsKey("backbround")){//required
				AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getAtlasFileName(styleAttributes.get("background")), TextureAtlas.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
			}
			
			if(styleAttributes.containsKey("backbround")){//required
				AssetDescriptor<TextureAtlas> assetDescriptor = new AssetDescriptor<TextureAtlas>(AssetUtils.getAtlasFileName(styleAttributes.get("background")), TextureAtlas.class);
				dependencies.put(assetDescriptor.fileName, assetDescriptor);
			}
		}
		
		return dependencies;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public T create(Element element, Object context) {
		ObjectMap<String, String> attributes = element.getAttributes();
		//required attributes
		float min = Float.parseFloat( attributes.get("min") );
		float max = Float.parseFloat( attributes.get("max") );
		float stepSize = Float.parseFloat( attributes.get("stepsize") );
		boolean vertical = Boolean.parseBoolean( attributes.get("vertical") );
		
		ProgressBar progressBar;
		if(attributes.containsKey("skin")){
			Skin skin = actorLoader.getAsset(attributes.get("skin"), Skin.class);
			progressBar = new ProgressBar(min, max, stepSize, vertical, skin);
		}else{
			ProgressBar.ProgressBarStyle style = actorLoader.getStyle(attributes.get("style"), ProgressBar.ProgressBarStyle.class);
			progressBar = new ProgressBar(min, max, stepSize, vertical, style);
		}
		set((T) progressBar, element, context);
		return (T) progressBar;
	}

	@Override
	public Class<?> getStyleType() {
		return ProgressBar.ProgressBarStyle.class;
	}
	
	@Override
	protected void set(T progressbar, Element element, Object context) {
		super.set(progressbar, element, context);
		ObjectMap<String, String> attributes = element.getAttributes();
		
		if(attributes.containsKey("animateduration")){
			progressbar.setAnimateDuration(Float.parseFloat(attributes.get("animateduration")));
		}
		if(attributes.containsKey("animateinterpolation")){
			progressbar.setAnimateInterpolation(ActorUtils.parseInterpolation(attributes.get("animateinterpolation")));
		}
		if(attributes.containsKey("animateinterpolation")){
			progressbar.setAnimateInterpolation(ActorUtils.parseInterpolation(attributes.get("animateinterpolation")));
		}
		if(attributes.containsKey("disabled")){
			progressbar.setDisabled(Boolean.parseBoolean(attributes.get("disabled")));
		}
	}
	
	@Override
	public Object createStyle(String attributes) {
		ObjectMap<String, String> styleAttributes = parseStyleAttributes(attributes);
		ProgressBar.ProgressBarStyle style = new ProgressBar.ProgressBarStyle();
		if(styleAttributes.containsKey("background")){
			style.background = actorLoader.getAsset(styleAttributes.get("background"), Drawable.class);
		}
		if(styleAttributes.containsKey("disabledbackground")){
			style.disabledBackground = actorLoader.getAsset(styleAttributes.get("disabledbackground"), Drawable.class);
		}
		if(styleAttributes.containsKey("disabledknob")){
			style.disabledKnob = actorLoader.getAsset(styleAttributes.get("disabledknob"), Drawable.class);
		}
		if(styleAttributes.containsKey("disabledknobafter")){
			style.disabledKnobAfter = actorLoader.getAsset(styleAttributes.get("disabledknobafter"), Drawable.class);
		}
		if(styleAttributes.containsKey("disabledknobbefore")){
			style.disabledKnobBefore = actorLoader.getAsset(styleAttributes.get("disabledknobbefore"), Drawable.class);
		}
		if(styleAttributes.containsKey("knob")){
			style.knob = actorLoader.getAsset(styleAttributes.get("knob"), Drawable.class);
		}
		if(styleAttributes.containsKey("knobafter")){
			style.knobAfter = actorLoader.getAsset(styleAttributes.get("knobafter"), Drawable.class);
		}
		if(styleAttributes.containsKey("knobbefore")){
			style.knobBefore = actorLoader.getAsset(styleAttributes.get("knobbefore"), Drawable.class);
		}
		return style;
	}
}
