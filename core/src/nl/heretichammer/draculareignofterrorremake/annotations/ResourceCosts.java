package nl.heretichammer.draculareignofterrorremake.annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface ResourceCosts {
	public int time();
	public int gold();
	public int wood() default 0;
	public int food() default 0;
}
