package nl.heretichammer.draculareignofterrorremake.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.HashMap;
import java.util.Map;

import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.utils.Disposable;
import com.google.common.collect.ImmutableMap;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface Asset {
	public String path();
	public Class<? extends Disposable> type();
}
