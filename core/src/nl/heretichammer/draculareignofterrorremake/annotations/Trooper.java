package nl.heretichammer.draculareignofterrorremake.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface Trooper {	
	public String name();
	public int size();
	public boolean physical() default true;
	public ResourceCost cost();
}
