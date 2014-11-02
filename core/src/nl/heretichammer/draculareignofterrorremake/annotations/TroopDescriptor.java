package nl.heretichammer.draculareignofterrorremake.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface TroopDescriptor {
	public static final int DEFAULT_SIZE = 1;
	
	public String name();
	public int size() default DEFAULT_SIZE;
	public int goldCost();
	public int woodCost();
	public int foodCost();
}
