package nl.heretichammer.draculareignofterrorremake.models.units;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface UnitAttributes {
	public int strength();
	public int accuracy();
	public int defence();
	public int stamina();
	public int speed();
	public int range();
}
