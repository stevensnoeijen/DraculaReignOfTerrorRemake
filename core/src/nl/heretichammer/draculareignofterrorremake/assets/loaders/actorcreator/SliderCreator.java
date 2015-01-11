package nl.heretichammer.draculareignofterrorremake.assets.loaders.actorcreator;

import com.badlogic.gdx.scenes.scene2d.ui.Skin;
import com.badlogic.gdx.scenes.scene2d.ui.Slider;
import com.badlogic.gdx.scenes.scene2d.utils.Drawable;
import com.badlogic.gdx.utils.ObjectMap;
import com.badlogic.gdx.utils.XmlReader.Element;

public class SliderCreator extends ProgressBarCreator<Slider> {

	public SliderCreator(ActorLoader actorLoader) {
		super(actorLoader);
	}

	@Override
	public String getName() {
		return "slider";
	}
	
	@Override
	public Slider create(Element element, Object context) {
		ObjectMap<String, String> attributes = element.getAttributes();
		//required attributes
		float min = Float.parseFloat( attributes.get("min") );
		float max = Float.parseFloat( attributes.get("max") );
		float stepSize = Float.parseFloat( attributes.get("stepsize") );
		boolean vertical = Boolean.parseBoolean( attributes.get("vertical") );
		
		Slider slider;
		if(attributes.containsKey("skin")){
			Skin skin = actorLoader.getAsset(attributes.get("skin"), Skin.class);
			slider = new Slider(min, max, stepSize, vertical, skin);
		}else{
			Slider.SliderStyle style = actorLoader.getStyle(attributes.get("style"), Slider.SliderStyle.class);
			slider = new Slider(min, max, stepSize, vertical, style);
		}
		set(slider, element, context);
		return slider;
	}
	
	@Override
	protected void set(Slider slider, Element element, Object context) {
		super.set(slider, element, context);
	}
	
	@Override
	public Class<?> getStyleType() {
		return Slider.SliderStyle.class;
	}
	
	//TODO: combine with progressbarcreator, this is a copy atm.
	@Override
	public Object createStyle(String attributes) {		
		ObjectMap<String, String> styleAttributes = parseStyleAttributes(attributes);
		Slider.SliderStyle style = new Slider.SliderStyle();
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
